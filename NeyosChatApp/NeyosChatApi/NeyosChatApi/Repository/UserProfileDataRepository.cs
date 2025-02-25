using System;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
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

        //public async Task<List<T>> GetSpecificPKandSKDataForConversationId(string pkValue, int skValue, string username)
        //{
        //    try
        //    {
        //        var queryConfig = new QueryOperationConfig
        //        {
        //            KeyExpression = new Expression
        //            {
        //                ExpressionStatement = "begins_with(PK, :pkValue) AND SK = :skValue",
        //                ExpressionAttributeValues = new Dictionary<string, DynamoDBEntry>
        //                {
        //                    {":pkValue", pkValue},
        //                    {":skValue", skValue }
        //                }
        //            },
        //            FilterExpression = new Expression
        //            {
        //                ExpressionStatement = "contains(PK, :username)",
        //                ExpressionAttributeValues = new Dictionary<string, DynamoDBEntry>
        //                {
        //                    { ":username", username }
        //                }
        //            },
        //            Select = SelectValues.SpecificAttributes,
        //            AttributesToGet = new List<string> { "PK"}
        //        };

        //        var query = dynamoDBContext.FromQueryAsync<T>(queryConfig);
        //        return await query.GetRemainingAsync();

        //        //return await dynamoDBContext.LoadAsync<T>(pkValue, skValue);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Exception at GetSpecificPKandSKDataForConversationId: {ex}");
        //        throw;
        //    }
        //}
    }
}

