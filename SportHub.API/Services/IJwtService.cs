using SportHub.Models;

namespace SportHub.API.Helpers;

public interface IJwtService
{
    public Task<JwtResponse> GenerateTokens(User user);
    public bool ValidateToken(string token);
    public Task<string> GetUserEmailAsync(string token);
}