using SportHub.Data;

namespace SportHub.Business;

public interface IJwtService
{
    public Task<JwtResponse> GenerateTokens(User user);
    public bool ValidateToken(string token);
    public Task<string> GetUserEmailAsync(string token);
    public bool DeleteRefreshToken(string token);
}