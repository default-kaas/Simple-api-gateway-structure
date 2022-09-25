namespace Domain.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public Guid CompanyId { get; set; }
        public string? CompanyName { get; set; } = string.Empty;
        public string? UserName { get; set; } = string.Empty;
        public List<string>? Permissions { get; set; }
        public string? Password { get; set; } = string.Empty;
    };
}
