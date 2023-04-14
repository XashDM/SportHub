using SportHub.Data.DTO;
using SportHub.Data.Entities;
namespace SportHub.Business;

public interface IJwtService
{
    public Task<JwtResponse> GenerateTokensAsync(UserResponseDto user);
    public bool ValidateToken(string token);
    public Task<string> GetIdByTokenAsync(string token);
    public Task DeleteRefreshTokenAsync(string token);
}