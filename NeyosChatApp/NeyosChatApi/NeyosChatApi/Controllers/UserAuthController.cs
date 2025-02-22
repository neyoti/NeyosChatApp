using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeyosChatApi.Data;
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
        private readonly FakeData _fakeData;
        private readonly DynamoDbService _dynamoDbService;

		public UserAuthController(/*UserProfileContext userProfileContext,*/ PasswordService passwordService, FakeData fakeData, DynamoDbService dynamoDbService)
		{
			//_userProfileContext = userProfileContext;
			_passwordService = passwordService;
			_fakeData = fakeData;
            _dynamoDbService = dynamoDbService;
		}

		[HttpPost("login")]
		public async Task<ActionResult> UserLogIn([FromBody] LoginModel profile)
		{
			try
			{
                //var user = await _userProfileContext.UserProfile.FirstOrDefaultAsync(u => u.UserName == profile.UserName);
                //if (user == null || !_passwordService.VerifyPassword(user.HashedPassword, profile.Password))
                //	return Unauthorized("Invalid Credentials");

                //return Ok($"Welcome, {user.FirstName}");

                //var user = _fakeData.getUserNameData(profile.UserName); //getUserData().Where(u => u.UserName == profile.UserName).FirstOrDefault();

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
                //if (await _userProfileContext.UserProfile.AnyAsync(u => u.UserName == profile.UserName))
                //	return BadRequest("Username is already registered.");

                //if ( _fakeData.getUserData().Where(u => u.UserName == profile.UserName).Count() != 0)
                //	return BadRequest("Username is already registered.");

                if (await _dynamoDbService.CheckIfUserExist(profile.UserName, 1))
                    return BadRequest("Username is already registered.");

                var user = new UserDataModel
                {
                    PK = profile.UserName,
                    SK = 1,
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
					HashedPassword = _passwordService.HashPassword(profile.Password),
                    Bio = "",
                    Status = true
				};

                if (!await _dynamoDbService.AddUserData(user))
                    return StatusCode(500, new { error = "User Sign in failed."});
                else
                    return Ok("User registered successfully");

                //_fakeData.getUserData().Add(user);

                //           var userProfile = new UserProfile
                //           {
                //               FirstName = profile.FirstName,
                //               LastName = profile.LastName,
                //               UserName = profile.UserName,
                //Status = true
                //           };

                //_fakeData.getUserProfile().Add(userProfile);
                //_userProfileContext.Add(user);
                //await _userProfileContext.SaveChangesAsync();
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
                //if (await _userProfileContext.UserProfile.AnyAsync(u => u.UserName == profile.UserName))
                //	return BadRequest("Username is already registered.");
                Console.WriteLine($"In UpdateUserProfile: {profile.UserName}");
                UserProfile user = _fakeData.getUserProfile(profile.UserName);
                if (user == null)
                    return BadRequest("User does not exist.");

                _fakeData.getUserProfile().Remove(user);

                user = new UserProfile
                {
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
                    UserName = profile.UserName,
                    Bio = profile.Bio,
                    Status = true
                };

                _fakeData.getUserProfile().Add(user);

                //_userProfileContext.Add(user);
                //await _userProfileContext.SaveChangesAsync();

                return Ok("User profile updated successfully");

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in UpdateUserProfile: {ex}");
            }

            return Ok();
        }

    }
}

