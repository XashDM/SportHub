namespace SportHub.Data.DTO
{
    public class UserLoginResponseDto
    {
        public string AccessToken { get; set; }
        
        public UserResponseDto User { get; set; }
    }
}