using System;
using Microsoft.AspNetCore.SignalR;
using NeyosChatApi.Models;
using System.Linq;
using NeyosChatApi.Services;
using System.Text.Json;
using NeyosChatApi.Data;
using System.Diagnostics.Metrics;

namespace NeyosChatApi.Hubs
{
	public class ChatHub : Hub
	{
		private readonly string _botUser;
        private readonly IDictionary<string, UserConn> _conn;

        private readonly OnlineUsersService _onlineUsersService;
        private readonly ConversationService _conversationService;

        private readonly FakeData _fakeData;

        public ChatHub(IDictionary<string, UserConn> conn,  OnlineUsersService onlineUsersService,
            ConversationService conversationService, FakeData fakeData)
		{
			_botUser = "Amit";
			_onlineUsersService = onlineUsersService;
			_conn = conn;
            _conversationService = conversationService;
            _fakeData = fakeData;
        }

        //public override async Task OnConnectedAsync()
        //{
        //    if (_conn.TryGetValue(Context.ConnectionId, out UserConn? userConnection))
        //    {
        //        _conn[Context.ConnectionId] = new UserConn { User = userConnection.User, ConnectionId = Context.ConnectionId };
        //    }

        //    await base.OnConnectedAsync();
        //}

        public override Task OnDisconnectedAsync(Exception? exception)
        {
			if(_conn.TryGetValue(Context.ConnectionId, out UserConn? userConnection))
			{
                Console.WriteLine($"Conn Id:{Context.ConnectionId}, user: {userConnection.User}");
                _conn.Remove(Context.ConnectionId);
				Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left the chat.");

                //SendConnectedUsers(userConnection.Room);
                SendOnlineUsers();
            }

			return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message, string recipient)
        {
            try
            {
                if (_conn.TryGetValue(Context.ConnectionId, out UserConn? userconnection))
                {
                    Console.WriteLine($"Recipient:{recipient}, Message:{message}, User:{userconnection.User}, context.connId: {Context.ConnectionId}");

                    // Generate the conversation ID for the group
                    var conversationId = _conversationService.GetConversationId(userconnection.User, recipient);

                    await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);

                    Console.WriteLine($"Sender: {userconnection.User}, Recipient: {recipient}, Message: {message}");

                    // Broadcast the message to all users in the group
                    await Clients.Group(conversationId).SendAsync("ReceiveMessage", userconnection.User, message);
                }
                else
                    Console.WriteLine("Yooooooo");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in SendMessage: {ex}");
            }
        }

        public async Task SaveNewChatMessages(System.Text.Json.JsonElement messagesArray, string recipient)
        {
            try
            {

                if (_conn.TryGetValue(Context.ConnectionId, out UserConn? userconnection))
                {
                    Console.WriteLine($"Recipient:{recipient}, User:{userconnection.User}");

                    // Generate the conversation ID for the group
                    var conversationId = _conversationService.GetConversationId(userconnection.User, recipient);

                    Console.WriteLine($"conversationId:{conversationId}");
                    Console.WriteLine(messagesArray.GetType());

                    foreach (var element in messagesArray.EnumerateArray())
                    {
                        Console.WriteLine($"Element: {element}, ValueKind: {element.ValueKind}");
                    }

                    List<string?> list = messagesArray.EnumerateArray()
                        .Select(element => element.ValueKind == JsonValueKind.String ? element.GetString() : element.ToString())
                        .ToList();

                    foreach (var i in list)
                        Console.WriteLine($"MessageArray: {string.Join(",", list)}");

                    _fakeData.SaveChats(conversationId, list);

                    string jsonElement = GetChatMessages(conversationId);

                    await Clients.Group(conversationId).SendAsync("UpdateChatMessages", jsonElement);
                }
                else
                    Console.WriteLine("Yooooooo");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in SendMessage: {ex}");
            }
        }

        public string GetChatMessages(string conversationId)
        {
            try
            {
                // Step 1: Create a List<string>
                List<string> chatList = _fakeData.GetChatsForConversationId(conversationId);

                // Step 2: Serialize the list to JSON
                string jsonString = JsonSerializer.Serialize(chatList);

                // Step 3: Parse the JSON string into a JsonDocument
                using JsonDocument doc = JsonDocument.Parse(jsonString);

                using(JsonDocument d = JsonDocument.Parse(jsonString))
                {
                    Console.WriteLine("JsonElement got it");
                    return d.RootElement.GetRawText();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in GetChatMessages:", ex.ToString());
                Console.WriteLine(ex.StackTrace);
            }
            return string.Empty;
        }

        public string GetUserProfileData(string username)
        {
            try
            {
                // Step 1: Create a List<string>
                List<UserProfile> userProfile = _fakeData.getUserProfile(username);

                foreach (var i in userProfile)
                    Console.WriteLine($"UserProfileInGetUserProfileData::{i.FirstName}, {i.LastName}, {i.UserName}, {i.Status}");

                // Step 2: Serialize the list to JSON
                string jsonString = JsonSerializer.Serialize(userProfile);

                // Step 3: Parse the JSON string into a JsonDocument
                using JsonDocument doc = JsonDocument.Parse(jsonString);

                using (JsonDocument d = JsonDocument.Parse(jsonString))
                {
                    Console.WriteLine("JsonElement got it");
                    return d.RootElement.GetRawText();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in GetChatMessages:", ex.ToString());
                Console.WriteLine(ex.StackTrace);
            }
            return string.Empty;
        }

        public async Task JoinChat(string sender, string recipient)
        {
            try
            {
                Console.WriteLine($"In JoinChat:");
                Console.WriteLine($"{sender}");
                Console.WriteLine($"{recipient}");

                // Generate the conversation ID for the group
                var conversationId = _conversationService.GetConversationId(_conn[Context.ConnectionId].User, recipient);
              
                _conn[Context.ConnectionId].Room = conversationId;

                await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);

                Console.WriteLine($"In JoinChat Conn Id:{Context.ConnectionId}, user: {sender}");

                await Clients.Group(conversationId).SendAsync("ReceiveMessage", _botUser, $"{sender} has joined the Chat");

                // Code to get chats for User Profile data
                string userProfileJsonElement = GetUserProfileData(recipient);

                await Clients.Client(Context.ConnectionId).SendAsync("RecipientProfileData", userProfileJsonElement);
                // end here


                // Code to get chats for conversation id
                string jsonElement = GetChatMessages(conversationId);

                await Clients.Group(conversationId).SendAsync("UpdateChatMessages", jsonElement);
                // end here
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in JoinChat:", ex.ToString());
                Console.WriteLine(ex.StackTrace);
            }
        }

        public async Task JoinChatLobby(UserConn userConnection)
        {
            //await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.User);

            //_conn[Context.ConnectionId] = userConnection;
            Console.WriteLine($"Conn Id:{Context.ConnectionId}, user: {userConnection.User}");
            _conn[Context.ConnectionId] = new UserConn { User = userConnection.User, ConnectionId = Context.ConnectionId };

            //await Clients.All.SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined the Chat");

            await SendOnlineUsers();

            await SendConnectedUsers(userConnection.User);
        }

        public Task SendConnectedUsers(string username)
        {
            var users = _conn.Values
                .Where(user => user.User == username);

            return Clients.Group(username).SendAsync("UsersInRoom", users);
        }

        public Task SendOnlineUsers()
        {
			var users = _onlineUsersService.ListOfOnlineUsers();

			return Clients.All.SendAsync("OnlineUsers", users);
        }

    }
}

