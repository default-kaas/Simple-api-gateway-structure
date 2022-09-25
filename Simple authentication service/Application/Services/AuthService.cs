using Microsoft.IdentityModel.Tokens;
using Domain.Models;
using Application.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Persistence.Repositories.Interfaces;

namespace Application.Services
{
    public class AuthService : AuthServiceInterface
    {
        private readonly IRepository _iRepository;
        public AuthService(IRepository iRepository)
        {
            _iRepository = iRepository ?? throw new ArgumentNullException(nameof(iRepository));
        }

        public SigningCredentials CreateSigningCredentials()
        {
            var keyBytes = Encoding.UTF8.GetBytes("7dc44c2c-d8a9-4545-b32f-76b3f88824db");
            var symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);
            return new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        }
        public AuthenticationResponse CreateAuthorizedAuthenticationResponse(User placeHolderUser)
        {   
            var claims = new List<Claim>
            {
                new Claim("sub", placeHolderUser.UserId.ToString()),
                new Claim("jti", Guid.NewGuid().ToString()),
                new Claim("CompanyId", placeHolderUser.CompanyId.ToString()),
                new Claim("CompanyName", placeHolderUser.CompanyName ?? "")
            };

            foreach (var permission in placeHolderUser.Permissions ?? new List<string>())
                claims.Add(new Claim(ClaimTypes.Role, permission));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddSeconds(900),
                SigningCredentials = CreateSigningCredentials()
            };
            var _tokenHandler = new JwtSecurityTokenHandler();
            var token = _tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticationResponse(Guid.NewGuid(), _tokenHandler.WriteToken(token), null, false);
        }

        public async Task<AuthenticationResponse> Authenticate(AuthenticationRequest authenticationRequest)
        {
            var result = await _iRepository.FirstOrNullAsync<User>(row => row.UserName != null  && row.UserName.Equals(authenticationRequest.UserName));
            
            if (result is null)
                return new AuthenticationResponse(Guid.NewGuid(), null, "Invalid login credentials", true);
            if (result.Password is null || !result.Password.Equals(authenticationRequest.Password))
                return new AuthenticationResponse(Guid.NewGuid(), null, "Invalid login credentials", true);

            return CreateAuthorizedAuthenticationResponse(result);
        }
    }
}
