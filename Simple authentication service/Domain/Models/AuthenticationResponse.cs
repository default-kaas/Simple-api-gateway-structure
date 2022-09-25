namespace Domain.Models
{
    public record AuthenticationResponse(Guid RefreshToken, string? Jwt, string? ErrorMessage, bool HasError);
}
