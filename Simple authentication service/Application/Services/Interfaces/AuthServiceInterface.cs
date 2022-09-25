using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface AuthServiceInterface
    {
        Task<AuthenticationResponse> Authenticate(AuthenticationRequest authenticationRequest);
    }
}
