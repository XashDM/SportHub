using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);

        Task<IEnumerable<User>> GetAllUsersAsync();

        Task InsertOneAsync(User user);
    }
}

