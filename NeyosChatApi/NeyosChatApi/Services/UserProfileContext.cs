using System;
using Microsoft.EntityFrameworkCore;
using NeyosChatApi.Models;

namespace NeyosChatApi.Services
{
	public class UserProfileContext : DbContext
	{
        public UserProfileContext(DbContextOptions<UserProfileContext> options) : base(options)
        {
        }

        public DbSet<UserProfile> UserProfile { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserProfile>().HasIndex(u => u.UserName).IsUnique();
        }
    }
}

