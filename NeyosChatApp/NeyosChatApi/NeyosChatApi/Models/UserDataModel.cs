using System;
using Amazon.DynamoDBv2.DataModel;

namespace NeyosChatApi.Models
{
    [DynamoDBTable("UserProfileData")]
    public class UserDataModel
    {
        [DynamoDBHashKey]
        public string PK { get; set; }

        [DynamoDBRangeKey]
        public int SK { get; set; }

        [DynamoDBProperty]
        public string FirstName { get; set; }

        [DynamoDBProperty]
        public string LastName { get; set; }

        [DynamoDBProperty]
        public string HashedPassword { get; set; }

        [DynamoDBProperty]
        public string Bio { get; set; }

        [DynamoDBProperty]
        public bool Status { get; set; }
    }
}
