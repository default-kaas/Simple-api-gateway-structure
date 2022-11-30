using System.Text.Json.Serialization;

namespace Domain.Models
{
    public record AuthenticationResponse(Guid RefreshToken, string? Jwt, [property: JsonIgnore] string? ErrorMessage, [property: JsonIgnore] bool HasError);
}
