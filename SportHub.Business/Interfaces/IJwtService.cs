using SportHub.Data.DTO;
using SportHub.Data.Entities;
namespace SportHub.Business;

public interface IJwtService
{
    public Task<JwtResponse> GenerateTokensAsync(UserResponseDto user);
    public string ValidateToken(string token);
    public Task<string> GetIdByTokenAsync(string token);
    public Task DeleteRefreshTokenAsync(string token);
    public string GenerateActivationLink(UserResponseDto user);
}