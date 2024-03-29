using System.ComponentModel.Design;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using SportHub.Data.Entities;
using SportHub.Data.DTO;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IJwtService _jwtService;
        private readonly string  _frontendUrl;
        
        public UserService(IConfiguration config, IUserRepository userRepository, IMapper mapper, 
            IJwtService jwtService, IEmailService emailService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtService = jwtService;
            _emailService = emailService;
            _frontendUrl = config.GetSection("Frontend")["Url"];
        }
        
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            
            return users;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            
            return user;
        }
        
        public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return null;
            }
            
            var user = await _userRepository.GetUserByEmailAsync(email);
            
            if (user == null || !(user.Password == password && user.IsActivated))
            {
                return null;
            }

            return user;
        }
        
        public async Task<User> GetUserByIdAsync(string id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            return user;
        }

        public async Task<string> CreateUserAsync(User user, Boolean autoActivate = false)
        {
            string id = await _userRepository.InsertOneAsync(user);
            
            if (autoActivate)
            {
                await _userRepository.ActivateUserAccountAsync(id);
            }
            else
            {
                var activationToken = _jwtService.GenerateActivationToken(user);
            
                string activationLink = $"https://localhost:7168/Auth/activate/{activationToken}";

                await _emailService.SendActivationEmailAsync(user.Email, activationLink);
            }
            
            return id;
        }

        public async Task UpdateUserAsync(User userUpdates)
        {
            var existingUser = await this.GetUserByIdAsync(userUpdates.UserId);
            
            if (existingUser == null)
            {
                throw new Exception($"User with ID '{userUpdates.UserId}' not found.");
            }
            
            User updatedUser = _mapper.Map<User, User>(userUpdates, existingUser);
            
            await _userRepository.UpdateUserAsync(updatedUser);
        }

        public async Task<bool> ActivateUserAccountAsync(string token)
        {
            try
            {
                string userId = _jwtService.GetUserIdByToken(token);
                            
                await _userRepository.ActivateUserAccountAsync(userId);
                
                return true;
            }
            catch
            {
                return false;
            }
            
        }

        public async Task<(bool, string)> ChangePasswordAsync(string token, string password)
        {
            string userId = _jwtService.GetUserIdByToken(token);
            
            if(string.IsNullOrEmpty(userId))
            {
                return (false, "Invalid token");
            }

            var user = await this.GetUserByIdAsync(userId);
            
            if (user == null)
            {
                return (false, "Account do not exists");
            }
            
            await _userRepository.ChangePasswordAsync(userId, password);
            
            return (true, "");
        }

        public async Task<bool> SendResetPasswordLinkAsync(string email)
        {
            try
            {
                var insertedUser = await this.GetUserByEmailAsync(email);
                
                var activationToken = _jwtService.GenerateActivationToken(insertedUser);
                
                string activationLink = $"{_frontendUrl}/password-change/{activationToken}";
                
                _emailService.SendPasswordResetLinkAsync(email, activationLink);
                
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

