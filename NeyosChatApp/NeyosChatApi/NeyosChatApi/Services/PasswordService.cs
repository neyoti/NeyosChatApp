using System;
using Microsoft.AspNetCore.Identity;
using NeyosChatApi.Models;

namespace NeyosChatApi.Services
{
	public class PasswordService
    {
        private readonly PasswordHasher<UserData> _passwordHasher = new();

        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password);
        }

        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            try
            {
                return _passwordHasher.VerifyHashedPassword(null, hashedPassword, providedPassword) == PasswordVerificationResult.Success;
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Exception in VerifyPassword: {ex}");
            }
            return false;
        }
    }
}

