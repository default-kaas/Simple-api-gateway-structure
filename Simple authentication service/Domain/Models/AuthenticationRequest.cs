using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public record AuthenticationRequest([Required] string UserName, [Required] string Password, [Required] bool CanRemember);
}
