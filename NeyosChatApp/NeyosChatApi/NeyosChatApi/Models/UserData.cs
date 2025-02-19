using System;
namespace NeyosChatApi.Models
{
	public class UserData
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
        public string LastName { get; set; }
        public string HashedPassword { get; set; }
		public string UserName { get; set; }
	}
}

