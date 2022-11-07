using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? UserName { get; set; }
        public string? Permissions { get; set; }
        public string? Password { get; set; }
    };
}
