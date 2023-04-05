using SportHub.Data;

namespace SportHub.Business
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetUsersAsync();

        public Task<User> GetUserByEmailAsync(string email);
    }
}


