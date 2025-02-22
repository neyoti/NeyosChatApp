using System;
using Amazon.DynamoDBv2.DataModel;

namespace NeyosChatApi.Models
{
    [DynamoDBTable("UserProfileData")]
    public class ChatSession
    {
        [DynamoDBHashKey]
        public string PK { get; set; }

        [DynamoDBRangeKey]
        public string SK { get; set; }

        [DynamoDBProperty]
        public List<string> ChatMessageArray { get; set; }
    }
}

