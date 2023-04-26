using SportHub.Data.DTO;

namespace SportHub.Business
{
    public interface IUserService
    {
        public Task<IEnumerable<UserResponseDto>> GetUsersAsync();
        public Task<UserResponseDto> GetUserByEmailAsync(string email);
        public Task<UserResponseDto> GetUserByIdAsync(string id);
        public Task<string> InsertOneAsync(UserRequestDto userDto);
        public  Task UpdateUserAsync(UserRequestDto newUser);
        public Task ActivateUserAccountAsync(string id);
        public Task ChangePasswordAsync(string userId, string password);
        public Task<UserResponseDto> GetUserByEmailAndPasswordAsync(string email, string password);
    }
}


