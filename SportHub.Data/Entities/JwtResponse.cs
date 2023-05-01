using SportHub.Data.DTO;

namespace SportHub.Data.Entities;

public class JwtResponse 
{
    public string AccessToken { get; set; }
    
    public string RefreshToken { get; set; }
    
    public User User { get; set; }
}