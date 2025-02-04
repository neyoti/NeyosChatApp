using System;
using System.Collections.Generic;
using NeyosChatApi.Models;

namespace NeyosChatApi.Data
{
	public class FakeData
	{
		private static List<UserData> userData = new List<UserData>
		{
			new UserData()
			{
				Id = 1,
				FirstName = "Amit",
				LastName = "Shinde",
				UserName = "Neyo",
				HashedPassword = "AQAAAAEAACcQAAAAELB95Zl3Akly90gb6GfvshO6StaT9qu/XndDS1VwjinPhTYZBM9ChGZyZBNW9wiVQw==",
			}
		};

        private static List<UserProfile> userProfile = new List<UserProfile>
        {
            new UserProfile()
            {
                Id = 1,
                FirstName = "Amit",
                LastName = "Shinde",
                UserName = "Neyo",
                Bio = "Yat Bhavo, Tat Bhavati",
                Status = true
            }
        };

        private static Dictionary<string, List<string>> userChatList = new Dictionary<string, List<string>>();

        public List<UserData> getUserData()
		{
			return userData;
		}

        public List<UserProfile> getUserProfile()
        {
            return userProfile;
        }

        public UserData getUserNameData(string userName)
        {
            return userData.FirstOrDefault(x => x.UserName == userName);// Where(x => x.UserName == userName).ToList();
        }

        public List<UserProfile> getUserProfile(string userName)
        {
            foreach(var i in userProfile)
                Console.WriteLine($"UserProfile::{i.FirstName}, {i.LastName}, {i.UserName}, {i.Status}");
            return userProfile.Where(x => x.UserName == userName).ToList();
        }

        public void setUserProfile(UserProfile profile, string userName)
        {
            var user = userProfile.FirstOrDefault(x => x.UserName == userName);
            user.Status = profile.Status;

            foreach (var i in userProfile)
                Console.WriteLine($"UserProfile::{i.FirstName}, {i.LastName}, {i.UserName}, {i.Status}");
        }

        public void SaveChats(string conversationId, List<string?> chatList)
		{
			if (userChatList.TryGetValue(conversationId, out List<string> list))
			{
				userChatList[conversationId].AddRange(chatList);
			}
			else
                userChatList[conversationId] = chatList;

			Console.WriteLine($"Chats:{ string.Join(Environment.NewLine, userChatList.Select(kvp => $"Key: {kvp.Key}, Value: {string.Join(",", kvp.Value)}")) }");
        }

        public List<string> GetChatsForConversationId(string conversationId)
        {
			if (userChatList.ContainsKey(conversationId))
				return userChatList[conversationId];
			else
			{
				List<string> list = new List<string>();
				list.Add("{\"user\":\"AMIT\",\"message\":\"Welcome User\"}");
				Console.WriteLine($"First list: {string.Join(",", list)}");

                return list;
			}
        }
    }
}

