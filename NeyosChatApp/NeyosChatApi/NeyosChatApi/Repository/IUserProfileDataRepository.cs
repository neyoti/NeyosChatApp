using System;
using NeyosChatApi.Models;

namespace NeyosChatApi.Repository
{
	public interface IUserProfileDataRepository<T>
	{
		public Task<List<T>> GetUserData(string pk, int sk);
		public Task<bool> SaveMetadata(T userData);
    }
}

