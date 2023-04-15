using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using SportHub.Data.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.DTO;


namespace SportHub.Business.Implementations
{ 
    public class JwtService : IJwtService
    {
        private readonly byte[] _key;
        private readonly ITokenRepository _tokenRepository;

        public JwtService(IConfiguration config, ITokenRepository tokenRepository)
        {
            _key = Encoding.ASCII.GetBytes(config.GetSection("JwtSettings")["SecretKey"]);
            _tokenRepository = tokenRepository;
        }

        public async Task<JwtResponse> GenerateTokensAsync(UserResponseDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = CreateTokenDescriptor(user);
            
            var accessToken = tokenHandler.CreateToken(tokenDescriptor);
            
            tokenDescriptor.Expires = DateTime.UtcNow.AddMinutes(15);
            var refreshToken  = tokenHandler.CreateToken(tokenDescriptor);
            await _tokenRepository.WriteTokenInDbAsync(tokenHandler.WriteToken(refreshToken), user.UserId);
            
            JwtResponse response= new JwtResponse();
            response.AccessToken = tokenHandler.WriteToken(accessToken);
            response.RefreshToken = tokenHandler.WriteToken(refreshToken);
            response.User = user;
            
            return response;
        }
        
        public string ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var tokenData = tokenHandler.ValidateToken(token,
                    CreateTokenValidationParameters(),
                    out SecurityToken validatedToken);
                string response = tokenData.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;

                return response;
            }
            catch
            {
                return "";
            }
        }

        public async Task DeleteRefreshTokenAsync(string token)
        {
            await _tokenRepository.DeleteRefreshTokenAsync(token);
        }

        public async Task<string> GetIdByTokenAsync(string token)
        {
            var id = await _tokenRepository.GetIdByTokenAsync(token);

            return id;
        }

        private SecurityTokenDescriptor CreateTokenDescriptor(UserResponseDto user)
        {
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? "admin" : "user")
                }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
        }

        private TokenValidationParameters CreateTokenValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
        }

        public string GenerateActivationLink(UserResponseDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = CreateTokenDescriptor(user);
            tokenDescriptor.Expires = DateTime.UtcNow.AddHours(24);
            
            var activationToken = tokenHandler.CreateToken(tokenDescriptor);

            string activationLink = $"https://localhost:7168/Auth/activate/{tokenHandler.WriteToken(activationToken)}";

            return activationLink;
        }
    
    }
}

