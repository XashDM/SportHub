using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using SportHub.Data.Entities;
using SportHub.Data.DTO;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations;

public class JwtService : IJwtService
{
    private readonly string _key;
    private readonly ITokenRepository _tokenRepository;

    public JwtService(IConfiguration config, ITokenRepository tokenRepository)
    {
        _key = config.GetSection("JwtSettings")["SecretKey"];
        _tokenRepository = tokenRepository;
    }

    public async Task<JwtResponse> GenerateTokensAsync(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.SecondName),
                new Claim(ClaimTypes.Role, user.IsAdmin ? "admin" : "user")
            }),
            Expires = DateTime.UtcNow.AddMinutes(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var accessToken = tokenHandler.CreateToken(tokenDescriptor);
        
        tokenDescriptor.Expires = DateTime.UtcNow.AddMinutes(2);
        var refreshToken  = tokenHandler.CreateToken(tokenDescriptor);
        await _tokenRepository.WriteTokenInDbAsync(tokenHandler.WriteToken(refreshToken), user.Email);
        
        
        JwtResponse response= new JwtResponse();
        response.AccessToken = tokenHandler.WriteToken(accessToken);
        response.RefreshToken = tokenHandler.WriteToken(refreshToken);
        response.User = new UserResponseDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            SecondName = user.SecondName,
            IsAdmin = user.IsAdmin
        };
        
        return response;
    }
    
    public bool ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_key);

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task DeleteRefreshTokenAsync(string token)
    {
        await _tokenRepository.DeleteRefreshTokenAsync(token);
    }

    public async Task<string> GetEmailByTokenAsync(string token)
    {
        var email = await _tokenRepository.GetEmailByTokenAsync(token);

        return email;
    }
    
}
