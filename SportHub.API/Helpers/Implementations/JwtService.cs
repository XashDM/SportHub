using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SportHub.Models;

namespace SportHub.API.Helpers.Implementations;

public class JwtService : IJwtService
{
    private readonly string _key;

    public JwtService(IConfiguration config)
    {
        _key = config.GetValue<string>("JwtSettings:SecretKey");
    }

    public JwtResponse GenerateSecurityToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.SecondName),
                new Claim(ClaimTypes.Role, user.IsAdmin ? "admin" : "user")
            }),
            Expires = DateTime.UtcNow.AddMinutes(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        JwtResponse response= new JwtResponse();
        response.AccessToken = tokenHandler.WriteToken(token);
        response.RefreshToken = "empty refresh token";

        return response;
    }
}
