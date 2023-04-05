using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using SportHub.Data;
using SportHub.Data.DTOs;

namespace SportHub.Business.Implementations;

public class JwtService : IJwtService
{
    private readonly string _key;
    private readonly string _connectionString;

    public JwtService(IConfiguration config)
    {
        _key = config.GetSection("JwtSettings")["SecretKey"];
        _connectionString = config.GetConnectionString("DefaultConnection");

    }

    public async Task<JwtResponse> GenerateTokens(User user)
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
        _WriteTokenInDb(tokenHandler.WriteToken(refreshToken), user.Email);
        
        
        JwtResponse response= new JwtResponse();
        response.AccessToken = tokenHandler.WriteToken(accessToken);
        response.RefreshToken = tokenHandler.WriteToken(refreshToken);
        response.User = new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            SecondName = user.SecondName,
            IsAdmin = user.IsAdmin
        };
        
        return response;
    }

    public async Task<string> GetUserEmailAsync(string token)
    {
        using (var connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            var query = "SELECT email FROM token WHERE refreshToken = @token";
            var result = await connection.QueryAsync<string>(query, new { token });
            return result.FirstOrDefault();
        }  
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
    
    public bool DeleteRefreshToken(string token)
    {
        try
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var sql = "DELETE FROM token WHERE refreshToken = @refreshToken";
                connection.Execute(sql, new { refreshToken=token });
            }   
            
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }
    }

    private async void _WriteTokenInDb(string token, string email)
    {
        using (var connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            var parameters = new { Email = email, RefreshToken = token };
            var sql = @"
                        INSERT INTO token (refreshToken, email)
                        VALUES (@RefreshToken, @Email)
                        ON DUPLICATE KEY UPDATE refreshToken = @RefreshToken;";
        
            await connection.ExecuteAsync(sql, parameters);
        }   
    }
}
