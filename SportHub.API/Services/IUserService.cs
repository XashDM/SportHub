using SportHub.Models;

namespace SportHub.Services
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        
        public Task<User> GetUserByIdAsync(string id);
        
        public Task<User> GetUserByEmailAsync(string email);
    }
}


