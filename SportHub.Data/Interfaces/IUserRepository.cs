using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task InsertOneAsync(User user); 
        Task UpdateUserAsync(User user);
        Task ActivateUserAccountAsync(string id);
        Task ChangePasswordAsync(string userId, string password);
    }
}

