using System;
using NeyosChatApi.Data;
using NeyosChatApi.Models;

namespace NeyosChatApi.Services
{
	public class OnlineUsersService
	{
        private readonly FakeData _fakeData;

        public OnlineUsersService(FakeData fakeData)
        {
            _fakeData = fakeData;
        }

		public IEnumerable<string> ListOfOnlineUsers()
		{
			return _fakeData.getUserProfile().Where(user => user.Status == true).Select(user => user.UserName);
		}
	}
}

