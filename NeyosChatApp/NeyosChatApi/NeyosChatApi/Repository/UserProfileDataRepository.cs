using System;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json.Linq;
using NeyosChatApi.Models;

namespace NeyosChatApi.Repository
{
	public class UserProfileDataRepository<T> : IUserProfileDataRepository<T> where T : class 
	{
        private readonly IDynamoDBContext dynamoDBContext;

        public UserProfileDataRepository(IDynamoDBContext dBContext)
        {
            var client = new AmazonDynamoDBClient(RegionEndpoint.USEast1);
            dynamoDBContext = dBContext;
        }

        public async Task<T> GetUserData(string pkValue, int skValue)
        {
            try
            {
                return await dynamoDBContext.LoadAsync<T>(pkValue, skValue);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception at GetUserData: {ex}");
                throw;
            }
        }

        public async Task<bool> SaveMetadata(T userData)
        {
            try
            {
                await dynamoDBContext.SaveAsync<T>(userData);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception at SaveMetadata: {ex}");
                throw;
            }
        }

        public async Task<bool> UpdateUserSchemaData(T userData)
        {
            try
            {
                await dynamoDBContext.SaveAsync<T>(userData);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception at UpdateUserSchemaData: {ex}");
                throw;
            }
        }
    }
}

