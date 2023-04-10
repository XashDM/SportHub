using Dapper;
using Microsoft.Extensions.Configuration;
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
    

    public async Task<string> GetIdByTokenAsync(string token)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var query = "SELECT UserId FROM token WHERE RefreshToken = @token";
            var result = await connection.QueryFirstOrDefaultAsync<string>(query, new { token });

            return result;
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

    public async Task WriteTokenInDbAsync(string token, string id)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var parameters = new { UserId = id, RefreshToken = token };
            var sql = @"
                        INSERT INTO token (RefreshToken, UserId)
                        VALUES (@RefreshToken, @UserId)
                        ON DUPLICATE KEY UPDATE RefreshToken = @RefreshToken;";
        
            await connection.ExecuteAsync(sql, parameters);
        }   
    }
}