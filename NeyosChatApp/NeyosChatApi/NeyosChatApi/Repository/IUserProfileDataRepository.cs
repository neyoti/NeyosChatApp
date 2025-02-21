using System;
namespace NeyosChatApi.Repository
{
	public interface IUserProfileDataRepository<T>
	{
		public Task<List<T>> getUserData(string pk, string sk);

    }
}

