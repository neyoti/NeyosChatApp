using System;
namespace NeyosChatApi.Models
{
	public class UserProfile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Bio { get; set; }
        public bool Status { get; set; }
    }
}

