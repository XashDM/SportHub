using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        public Task<User?> GetUserByEmailAsync(string email);
        public Task<User> GetUserByIdAsync(string id);
        public Task<string> CreateUserAsync(User userDto, Boolean autoActivate = false);
        public  Task UpdateUserAsync(User newUser);
        public Task<bool> ActivateUserAccountAsync(string token);
        public Task<(bool, string)> ChangePasswordAsync(string token, string password);
        public Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
        public Task<bool> SendResetPasswordLinkAsync(string email);
    }
}


