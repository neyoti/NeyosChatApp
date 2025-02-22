using System;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<T>> GetUserData(string pkValue, int skValue)
        {
            try
            {
                var queryConfig = new QueryOperationConfig
                {
                    KeyExpression = new Expression
                    {
                        ExpressionStatement = "PK = :pk AND SK = :sk", // Query by PK & SK
                        ExpressionAttributeValues = new Dictionary<string, DynamoDBEntry>
                        {
                            {":pk", pkValue},
                            {":sk", skValue}
                        }
                    },
                    ConsistentRead = true // Ensures latest data is fetched
                };

                var query = dynamoDBContext.FromQueryAsync<T>(queryConfig);
                return await query.GetRemainingAsync();
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
                dynamoDBContext.SaveAsync<T>(userData);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception at SaveMetadata: {ex}");
                throw;
            }
        }
    }
}

