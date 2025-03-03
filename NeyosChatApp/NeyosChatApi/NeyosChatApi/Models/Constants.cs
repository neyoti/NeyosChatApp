using System;
namespace NeyosChatApi.Models
{
	public class Constants
	{
		public readonly static string DynamoDbTableName = "UserProfileData";
		public readonly static string ChatSessionPkPrefix = "ConversationId-";
		public readonly static string S3BucketName = "neyo-site-user-profile-pic";
    }
}

