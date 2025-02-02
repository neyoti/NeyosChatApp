using System;
using Microsoft.AspNetCore.SignalR;

namespace NeyosChatApi.Models
{
	public class UserConn
	{
        public string? User { get; set; }

        public string Room { get; set; }

        public string ConnectionId { get; set; }
    }
}

