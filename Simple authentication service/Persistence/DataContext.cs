using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = Guid.NewGuid(),
                    CompanyId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    CompanyName = "Place holder company",
                    UserName = "Username1",
                    Permissions = "1,2",
                    Password = "test123"
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    CompanyId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    CompanyName = "Place holder company",
                    UserName = "Username2",
                    Permissions = "3",
                    Password = "test123"
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    CompanyId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    CompanyName = "Place holder company",
                    UserName = "Username3",
                    Permissions = "1,2,3",
                    Password = "test123"
                });
        }
    }
}
