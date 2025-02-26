using System;
using Microsoft.AspNetCore.Mvc;
using NeyosChatApi.Models;
using NeyosChatApi.Services;

namespace NeyosChatApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserAuthController : ControllerBase
	{
		//private readonly UserProfileContext _userProfileContext;
		private readonly PasswordService _passwordService;
        private readonly DynamoDbService _dynamoDbService;
        private readonly S3Service _s3Service;

		public UserAuthController(/*UserProfileContext userProfileContext,*/ PasswordService passwordService,
            DynamoDbService dynamoDbService, S3Service s3Service)
		{
			//_userProfileContext = userProfileContext;
			_passwordService = passwordService;
            _dynamoDbService = dynamoDbService;
            _s3Service = s3Service;
		}

		[HttpPost("login")]
		public async Task<ActionResult> UserLogIn([FromBody] LoginModel profile)
		{
			try
			{
                var user = await _dynamoDbService.GetUserData(profile.UserName, 1);
                if (user == null || !_passwordService.VerifyPassword(user.HashedPassword, profile.Password))
                    return Unauthorized("Invalid Credentials");

                return Ok($"Welcome, {user.FirstName}");

            }
			catch (Exception ex)
			{
				Console.WriteLine($"Exception: {ex}");
			}

			return Ok();
		}

		[HttpPost("signup")]
		public async Task<ActionResult> UserSignUp([FromBody] SignUpModel profile)
		{
            try
            {
                if (await _dynamoDbService.CheckIfUserExist(profile.UserName, 1))
                    return StatusCode(500, new { error = "Username is already registered." });
                    //return BadRequest("Username is already registered.");

                var user = new UserDataModel
                {
                    PK = profile.UserName,
                    SK = 1,
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
					HashedPassword = _passwordService.HashPassword(profile.Password),
                    Bio = ""
                    //Status = true
				};

                if (!await _dynamoDbService.AddUserData(user))
                    return StatusCode(500, new { error = "User Sign in failed."});
                else
                    return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex}");
            }

			return Ok();
        }

        //[HttpGet("GetAllUsers")]
        //public async Task<List<UserProfile>> GetAllUsers()
        //{
        //    var service = new DynamoDbService();
        //    Console.Write("Enter ProductId: ");
        //    string productId = "A";

        //    var l = await service.GetProductAsync(productId);

        //    Console.WriteLine($"Data:{l}");

        //    return _fakeData.getUserProfile();
        //}

		[HttpPost("updateuserprofile")]
		public async Task<ActionResult> UpdateUserProfile([FromBody] UserProfile profile)
		{
            try
            {
                Console.WriteLine($"In UpdateUserProfile: {profile.UserName}");

                if (!await _dynamoDbService.UpdateUserProfileData(profile))
                    return StatusCode(500, new { error = "Error while updating the user." });
                else
                    return Ok("User profile updated successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in UpdateUserProfile: {ex}");
            }

            return Ok();
        }

        [HttpPost("uploadProfilePic")]
        public async Task<ActionResult> UpdateProfilePic([FromForm] IFormFile file, [FromForm] string username)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var bucketName = "neyo-site-user-profile-pic";

            try
            {
                if(await _s3Service.UploadFileToS3(username, file, bucketName))
                {
                    return Ok($"File uploaded successfully: {file.FileName}");
                }
                else
                    return StatusCode(500, $"Failed to upload the file: {file.FileName}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in UpdateProfilePic:{ex}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}

