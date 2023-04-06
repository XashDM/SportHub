using SportHub.Data;

namespace SportHub.Business;

public interface IJwtService
{
    public Task<JwtResponse> GenerateTokensAsync(User user);
    public bool ValidateToken(string token);
    public Task<string> GetUserEmailAsync(string token);
    public Task DeleteRefreshTokenAsync(string token);
}