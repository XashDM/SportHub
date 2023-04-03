namespace SportHub.API.DTOs;

public class UserDto
{
    public string FirstName { get; set; } 
    
    public string SecondName { get; set; } 
    
    public bool IsAdmin { get; set; }

    public string Email { get; set; }
}