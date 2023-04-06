using SportHub.Data;
using SportHub.Data.DTOs;

namespace SportHub.Business
{
    public interface IUserService
    {
        public Task<IEnumerable<UserResponseDto>> GetUsersAsync();

        public Task<User> GetUserByEmailAsync(string email, string? password = null);
        public Task<bool> InsertOneAsync(UserRequestDto user);
    }
}


