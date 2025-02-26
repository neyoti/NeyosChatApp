using System;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NeyosChatApi.Models;
using NeyosChatApi.Repository;

namespace NeyosChatApi.Services
{
    public class S3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IUserProfileDataRepository<UserDataModel> _userProfileDataRepository;

        public S3Service(IAmazonS3 s3Client, IUserProfileDataRepository<UserDataModel> userProfileDataRepository)
        {
            _s3Client = s3Client;
            _userProfileDataRepository = userProfileDataRepository;
        }

        public async Task<bool> UploadFileToS3(string username, IFormFile file, string bucketName)
        {
            try
            {
                var key = username + Path.GetExtension(file.FileName);

                using (var newMemoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(newMemoryStream);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = newMemoryStream,
                        Key = key,
                        BucketName = bucketName,
                        ContentType = file.ContentType
                    };

                    var transferUtility = new TransferUtility(_s3Client);
                    await transferUtility.UploadAsync(uploadRequest);
                }

                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Exception in UploadFileToS3:{ex}");
            }
            return false;
        }
    }
}

