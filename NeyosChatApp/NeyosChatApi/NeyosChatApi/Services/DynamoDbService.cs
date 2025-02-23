using System;
using System.Collections.Generic;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Newtonsoft.Json.Linq;
using NeyosChatApi.Models;
using NeyosChatApi.Repository;

namespace NeyosChatApi.Services
{
    public class DynamoDbService
    {
        private readonly DynamoDBContext _context;
        private readonly IDynamoDBContext dynamoDBContext;
        private readonly IUserProfileDataRepository<UserDataModel> _userProfileDataRepository;
        private readonly IUserProfileDataRepository<ChatSession> _chatSessionRepository;

        public DynamoDbService(IDynamoDBContext dBContext, IUserProfileDataRepository<UserDataModel> userProfileDataRepository,
            IUserProfileDataRepository<ChatSession> chatSessionRepository)
        {
            var client = new AmazonDynamoDBClient(RegionEndpoint.USEast1);
            _context = new DynamoDBContext(client);
            dynamoDBContext = dBContext;
            _userProfileDataRepository = userProfileDataRepository;
            _chatSessionRepository = chatSessionRepository;
        }

        public async Task<Product> GetProductAsync(string productId)
        {
            return await _context.LoadAsync<Product>(productId, "Amit");
        }

        public async Task<bool> CheckIfUserExist(string pk, int sk)
        {
            var result = await _userProfileDataRepository.GetUserData(pk, sk);
            if(result != null)
                return true;
            else
                return false;
        }

        public async Task<bool> AddUserData(UserDataModel userData)
        {
            if (await _userProfileDataRepository.SaveMetadata(userData))
            {
                return true;
            }
            return false;
        }

        public async Task<UserDataModel> GetUserData(string pk, int sk)
        {
            var result = await _userProfileDataRepository.GetUserData(pk, sk);
            if (result != null)
                return result;
            else
                return null;
        }

        public async Task<bool> UpdateUserProfileData(UserProfile userProfile)
        {
            var user = await _userProfileDataRepository.GetUserData(userProfile.UserName, 1);
            if (user == null)
                Console.WriteLine("User does not exist.");

            //_fakeData.getUserProfile().Remove(user);

            user.FirstName = userProfile.FirstName;
            user.LastName = userProfile.LastName;
            user.Bio = userProfile.Bio;

            var result = await _userProfileDataRepository.UpdateUserSchemaData(user);
            return result;
        }

        public async Task SaveChats(string conversationId, List<string> chatArray)
        {
            var chatObject = await _chatSessionRepository.GetUserData(conversationId, 1);

            if (chatObject != null)
            {
                chatObject.ChatMessageArray.AddRange(chatArray);
            }
            else
            {
                chatObject = new ChatSession()
                {
                    PK = conversationId,
                    SK = 1,
                    ChatMessageArray = chatArray
                };
            }
            await _chatSessionRepository.SaveMetadata(chatObject);
        }

        public async Task<List<string>> GetChatsForConversationId(string conversationId)
        {
            try
            {
                var result = await _chatSessionRepository.GetUserData(conversationId, 1);
                if(result == null)
                {
                    return new List<string>(){
                        "{\"user\":\"AMIT\",\"message\":\"Welcome User\"}"
                    };
                }

                return result.ChatMessageArray;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetChatsForConversationId:{ex}");
            }
            return new List<string>();
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

