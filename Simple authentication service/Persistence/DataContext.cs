using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    // https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli
    public class DataContext : DbContext
    {
        // TODO: SQLite implementation
        // { get; set; }    
        // public string DbPath { get; }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            // TODO: SQLite implementation
            //var folder = Environment.SpecialFolder.LocalApplicationData;
            //var path = Environment.GetFolderPath(folder);
            //DbPath = System.IO.Path.Join(path, "authenticationSqliteDatabase.db");
        }
        public DbSet<User> Users => Set<User>();
        // TODO: SQLite implementation
        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.

        // TODO: SQLite implementation
        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //    => options.UseSqlite($"Data Source={DbPath}");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    CompanyId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    CompanyName = "Place holder company",
                    UserName = "Username1",
                    Permissions = new List<string> {
                        "1","2"
                    },
                    Password = "test123"
                },
                new User
                {
                    CompanyId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    CompanyName = "Place holder company",
                    UserName = "Username2",
                    Permissions = new List<string> {
                        "3"
                    },
                    Password = "test123"
                },
                new User
                {
                    CompanyId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    CompanyName = "Place holder company",
                    UserName = "Username3",
                    Permissions = new List<string> {
                        "1","2","3"
                    },
                    Password = "test123"
                });
        }
    }
}
