using SportHub.API.DTOs;

namespace SportHub.Models;

public class JwtResponse 
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public UserDto User { get; set; }
}