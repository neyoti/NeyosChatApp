using System;
namespace NeyosChatApi.Services
{
	public class ConversationService
	{
        public string GetConversationId(string user1, string user2)
        {
            var users = new[] { user1, user2 };
            Array.Sort(users); // Alphabetically sort usernames to generate a consistent ID
            return string.Join("-", users); // e.g., "user1-user2"
        }

    }
}

