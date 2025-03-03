using System;
using System.Collections.Generic;
using System.Text.Json;
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
        private readonly IUserProfileDataRepository<OnlineUsersModel> _onlineUserRepository;

        public DynamoDbService(IDynamoDBContext dBContext, IUserProfileDataRepository<UserDataModel> userProfileDataRepository,
            IUserProfileDataRepository<ChatSession> chatSessionRepository, IUserProfileDataRepository<OnlineUsersModel> onlineUserRepository)
        {
            var client = new AmazonDynamoDBClient(RegionEndpoint.USEast1);
            _context = new DynamoDBContext(client);
            dynamoDBContext = dBContext;
            _userProfileDataRepository = userProfileDataRepository;
            _chatSessionRepository = chatSessionRepository;
            _onlineUserRepository = onlineUserRepository;
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

        public async Task SaveChats(string conversationId, List<string> chatArray, string username, string recipient)
        {
            string pkValue = $"{Constants.ChatSessionPkPrefix}{conversationId}";

            var chatObject = await _chatSessionRepository.GetUserData(pkValue, 1);

            Console.WriteLine($"chatArray:{string.Join("--", chatArray)}");
            Dictionary<string, string> chatMessageDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(chatArray.FirstOrDefault());

            chatMessageDictionary["timestamp"] = DateTime.Now.ToString();

            if (chatObject != null)
            {
                var newList = new List<Dictionary<string, string>>();

                newList.Add(chatMessageDictionary);
                chatObject.ChatMessageArray.AddRange(newList);
            }
            else
            {
                var newList = new List<Dictionary<string, string>>();

                newList.Add(chatMessageDictionary);
                chatObject = new ChatSession()
                {
                    PK = pkValue,
                    SK = 1,
                    ChatMessageArray = newList
                };
            }
            await _chatSessionRepository.SaveMetadata(chatObject);

            //------------------------------------------------------------------

            var userObject = await _userProfileDataRepository.GetUserData(username, 1);

            if (userObject.ListOfRecipients == null)
                userObject.ListOfRecipients = new List<string> { recipient };
            else
            {
                if(!userObject.ListOfRecipients.Contains(recipient))
                    userObject.ListOfRecipients.Add(recipient);
            }

            await _userProfileDataRepository.SaveMetadata(userObject);

            //------------------------------------------------------------------

            var recipientObject = await _userProfileDataRepository.GetUserData(recipient, 1);

            if (recipientObject.ListOfRecipients == null)
                recipientObject.ListOfRecipients = new List<string> { username };
            else
            {
                if (!recipientObject.ListOfRecipients.Contains(username))
                    recipientObject.ListOfRecipients.Add(username);
            }

            await _userProfileDataRepository.SaveMetadata(recipientObject);
        }

        public async Task<List<string>> GetChatsForConversationId(string conversationId)
        {
            try
            {
                List<string> chatList = new List<string>();
                var result = await _chatSessionRepository.GetUserData(conversationId, 1);

                if (result == null)
                {
                    return null;
                }
                else
                {
                    //result.ChatMessageArray.Sort((dict1, dict2) => string.Compare(dict1["timestamp"], dict2["timestamp"]));

                    foreach (var item in result.ChatMessageArray)
                    {
                        var serializedData = JsonSerializer.Serialize(item);
                        chatList.Add(serializedData);
                    }
                }

                return chatList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetChatsForConversationId:{ex}");
            }
            return new List<string>();
        }

        public async Task<List<string>> GetOldChatRecipientsOfUser(string username)
        {
            try
            {
                var userObject = await _userProfileDataRepository.GetUserData(username, 1);

                return userObject.ListOfRecipients;
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Exception in GetOldChatRecipientsOfUser: {ex}");
                throw;
            }
        }

        public async Task<List<string>> GetListOfOnlineUsers()
        {
            try
            {
                var onlineUsersListObject = await _onlineUserRepository.GetUserData("OnlineUsers", 1);

                if (onlineUsersListObject.OnlineUsersList == null)
                    return null;

                return onlineUsersListObject.OnlineUsersList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in getListOfOnlineUsers: {ex}");
                throw;
            }
        }

        public async Task AddUserToListOfOnlineUsers(string userName)
        {
            try
            {
                var onlineUsersListObject = await _onlineUserRepository.GetUserData("OnlineUsers", 1);

                if (onlineUsersListObject == null || onlineUsersListObject.OnlineUsersList == null)
                {

                    onlineUsersListObject = new OnlineUsersModel()
                    {
                        PK = "OnlineUsers",
                        SK = 1,
                        OnlineUsersList = new List<string>() { userName }
                    };
                    await _onlineUserRepository.SaveMetadata(onlineUsersListObject);
                }
                else if( !onlineUsersListObject.OnlineUsersList.Contains(userName) )
                {
                    onlineUsersListObject.OnlineUsersList.Add(userName);
                    await _onlineUserRepository.SaveMetadata(onlineUsersListObject);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in AddUserToListOfOnlineUsers: {ex}");
                throw;
            }
        }

        public async Task RemoveUserFromListOfOnlineUsers(string userName)
        {
            try
            {
                var onlineUsersListObject = await _onlineUserRepository.GetUserData("OnlineUsers", 1);

                if (onlineUsersListObject != null || onlineUsersListObject.OnlineUsersList != null)
                {
                    if(onlineUsersListObject.OnlineUsersList.Count() > 1)
                        onlineUsersListObject.OnlineUsersList.Remove(userName);
                    else if(onlineUsersListObject.OnlineUsersList.Count() == 1 )
                        onlineUsersListObject.OnlineUsersList = null;
                    await _onlineUserRepository.SaveMetadata(onlineUsersListObject);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in RemoveUserFromListOfOnlineUsers: {ex}");
                throw;
            }
        }

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

