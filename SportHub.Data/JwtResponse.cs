using SportHub.Data.DTOs;

namespace SportHub.Data;

public class JwtResponse 
{
    public string AccessToken { get; set; }
    
    public string RefreshToken { get; set; }
    
    public UserResponseDto User { get; set; }
}