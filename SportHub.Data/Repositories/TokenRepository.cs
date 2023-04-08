using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class TokenRepository : ITokenRepository
{
    private readonly string _key;
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public TokenRepository(IConfiguration config, IDbConnectionFactory dbConnectionFactory)
    {
        _key = config.GetSection("JwtSettings")["SecretKey"];
        _dbConnectionFactory = dbConnectionFactory;

    }
    

    public async Task<string> GetEmailByTokenAsync(string token)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var query = "SELECT email FROM token WHERE refreshToken = @token";
            var result = await connection.QueryAsync<string>(query, new { token });
            
            return result.FirstOrDefault();
        }  
    }

    public async Task DeleteRefreshTokenAsync(string token)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = "DELETE FROM token WHERE refreshToken = @refreshToken";
            
            await connection.ExecuteAsync(sql, new { refreshToken=token });
        }
    }

    public async Task WriteTokenInDbAsync(string token, string email)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
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