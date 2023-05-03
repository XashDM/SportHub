using SportHub.Data.DTO;
using SportHub.Data.Entities;
namespace SportHub.Business;

public interface IJwtService
{
    public Task<JwtResponse> GenerateTokensAsync(User user);
    public bool ValidateToken(string token);
    public string GetUserIdByToken(string token);
    public Task<string> GetIdByRefreshTokenAsync(string token);
    public Task DeleteRefreshTokenAsync(string token);
    public string GenerateActivationToken(User user);
    public Task<string> GetRefreshTokenByUserId(string id);
}