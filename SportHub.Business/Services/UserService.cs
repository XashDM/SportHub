using System.ComponentModel.Design;
using AutoMapper;
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
        
        public UserService(IUserRepository userRepository, IMapper mapper, 
            IJwtService jwtService, IEmailService emailService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtService = jwtService;
            _emailService = emailService;
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

        public async Task UpdateUserAsync(User newUser)
        {
            await _userRepository.UpdateUserAsync(newUser);
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

        public async Task<ResponseWithBoolAndMessage> ChangePasswordAsync(string token, string password)
        {
            string userId = _jwtService.GetUserIdByToken(token);
            
            if(string.IsNullOrEmpty(userId))
            {
                return new ResponseWithBoolAndMessage
                {
                    IsSuccess = false, ErrorMessage = "Invalid token"
                };
            }

            var user = await this.GetUserByIdAsync(userId);
            
            if (user == null)
            {
                return new ResponseWithBoolAndMessage
                {
                    IsSuccess = false, ErrorMessage = "Account do not exists"
                };
            }
            
            await _userRepository.ChangePasswordAsync(userId, password);
            
            return new ResponseWithBoolAndMessage
            {
                IsSuccess = true, ErrorMessage = ""
            };
        }

        public async Task<bool> SendResetPasswordLinkAsync(string email)
        {
            try
            {
                var insertedUser = await this.GetUserByEmailAsync(email);
                
                var activationToken = _jwtService.GenerateActivationToken(insertedUser);
                
                string activationLink = $"http://localhost:3000/password-change/{activationToken}";
                
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

