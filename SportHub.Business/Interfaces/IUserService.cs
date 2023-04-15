using SportHub.Data.DTO;

namespace SportHub.Business
{
    public interface IUserService
    {
        public Task<IEnumerable<UserResponseDto>> GetUsersAsync();
        public Task<UserResponseDto> GetUserByEmailAsync(string email, string? password = null);
        public Task<UserResponseDto> GetUserByIdAsync(string id);
        public Task InsertOneAsync(UserRequestDto userDto);
        public  Task UpdateUserAsync(UserRequestDto newUser);
    }
}


