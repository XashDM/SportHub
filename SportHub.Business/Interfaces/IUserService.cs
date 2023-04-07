using SportHub.Data.Entities;
using SportHub.Data.DTO;

namespace SportHub.Business
{
    public interface IUserService
    {
        public Task<IEnumerable<UserResponseDto>> GetUsersAsync();

        public Task<User> GetUserByEmailAsync(string email, string? password = null);
        public Task InsertOneAsync(UserRequestDto userDto);
    }
}


