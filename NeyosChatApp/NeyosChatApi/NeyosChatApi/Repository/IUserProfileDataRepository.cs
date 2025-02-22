using System;
using NeyosChatApi.Models;

namespace NeyosChatApi.Repository
{
	public interface IUserProfileDataRepository<T>
	{
		public Task<T> GetUserData(string pk, int sk);
		public Task<bool> SaveMetadata(T userData);
		public Task<bool> UpdateUserSchemaData(T userData);
    }
}

