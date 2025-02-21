using System;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Newtonsoft.Json.Linq;
using NeyosChatApi.Models;

namespace NeyosChatApi.Services
{
    public class DynamoDbService
    {
        private readonly DynamoDBContext _context;
        private readonly IDynamoDBContext dynamoDBContext;

        public DynamoDbService(IDynamoDBContext dBContext)
        {
            var client = new AmazonDynamoDBClient(RegionEndpoint.USEast1);
            _context = new DynamoDBContext(client);
            dynamoDBContext = dBContext;
        }

        public async Task<Product> GetProductAsync(string productId)
        {
            return await _context.LoadAsync<Product>(productId, "Amit");
        }


        //private static List<UserData> userData = new List<UserData>
        //{
        //    new UserData()
        //    {
        //        Id = 1,
        //        FirstName = "Amit",
        //        LastName = "Shinde",
        //        UserName = "Neyo",
        //        HashedPassword = "AQAAAAEAACcQAAAAELB95Zl3Akly90gb6GfvshO6StaT9qu/XndDS1VwjinPhTYZBM9ChGZyZBNW9wiVQw==",
        //    }
        //};

        //private static List<UserProfile> userProfile = new List<UserProfile>
        //{
        //    new UserProfile()
        //    {
        //        Id = 1,
        //        FirstName = "Amit",
        //        LastName = "Shinde",
        //        UserName = "Neyo",
        //        Bio = "Yat Bhavo, Tat Bhavati",
        //        Status = true
        //    }
        //};

        //private static Dictionary<string, List<string>> userChatList = new Dictionary<string, List<string>>();


        //public List<UserProfile> getUserProfile()
        //{
        //    return userProfile;
        //}

        //public UserData getUserNameData(string userName)
        //{
        //    return userData.FirstOrDefault(x => x.UserName == userName);// Where(x => x.UserName == userName).ToList();
        //}

        //public UserProfile getUserProfile(string userName)
        //{
        //    //foreach(var i in userProfile)
        //    var user = userProfile.FirstOrDefault(x => x.UserName == userName);
        //    Console.WriteLine($"UserProfile::{user.FirstName}, {user.LastName}, {user.UserName}, {user.Status}");
        //    return user;
        //}

        //public void setUserProfile(UserProfile profile, string userName)
        //{
        //    var user = userProfile.FirstOrDefault(x => x.UserName == userName);
        //    user.Status = profile.Status;

        //    foreach (var i in userProfile)
        //        Console.WriteLine($"UserProfile::{i.FirstName}, {i.LastName}, {i.UserName}, {i.Status}");
        //}

        //public void SaveChats(string conversationId, List<string?> chatList)
        //{
        //    if (userChatList.TryGetValue(conversationId, out List<string> list))
        //    {
        //        userChatList[conversationId].AddRange(chatList);
        //    }
        //    else
        //        userChatList[conversationId] = chatList;

        //    Console.WriteLine($"Chats:{string.Join(Environment.NewLine, userChatList.Select(kvp => $"Key: {kvp.Key}, Value: {string.Join(",", kvp.Value)}"))}");
        //}

        //public List<string> GetChatsForConversationId(string conversationId)
        //{
        //    if (userChatList.ContainsKey(conversationId))
        //        return userChatList[conversationId];
        //    else
        //    {
        //        List<string> list = new List<string>();
        //        list.Add("{\"user\":\"AMIT\",\"message\":\"Welcome User\"}");
        //        Console.WriteLine($"First list: {string.Join(",", list)}");

        //        return list;
        //    }
        //}

        //public List<string> GetOldChatRecipientsOfUser(string username)
        //{
        //    List<string> matchingKeys = userChatList.Keys.Where(key => key.Contains(username)).ToList();

        //    List<string> usersList = new List<string>();
        //    Console.WriteLine("Matching keys:");
        //    foreach (var key in matchingKeys)
        //    {
        //        Console.WriteLine(key);
        //        if (key.Contains($"-{username}"))
        //            usersList.Add(key.Replace($"-{username}", ""));
        //        else if (key.Contains($"{username}-"))
        //            usersList.Add(key.Replace($"{username}-", ""));
        //    }

        //    return usersList;
        //}
    }
}

