using System;
using Amazon.DynamoDBv2.DataModel;

namespace NeyosChatApi.Models
{
    [DynamoDBTable("UserProfileData")]
    public class OnlineUsersModel
	{
        [DynamoDBHashKey]
        public string PK { get; set; }

        [DynamoDBRangeKey]
        public int SK { get; set; }

        [DynamoDBProperty]
        public List<string> OnlineUsersList { get; set; } = null;
    }
}
