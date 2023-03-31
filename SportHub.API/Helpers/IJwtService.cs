using SportHub.Models;

namespace SportHub.API.Helpers;

public interface IJwtService
{
    public JwtResponse GenerateSecurityToken(User user);
}