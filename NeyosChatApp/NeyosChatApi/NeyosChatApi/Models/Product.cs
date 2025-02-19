using System;
using Amazon.DynamoDBv2.DataModel;

namespace NeyosChatApi.Models
{
    [DynamoDBTable("Product")]
    public class Product
    {
        [DynamoDBHashKey]
        public string ProductId { get; set; }

        [DynamoDBProperty]
        public string Name { get; set; }
    }
}

