using SportHub.Data.Entities;
using SportHub.Data.DTO;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<IEnumerable<UserResponseDto>> GetUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            
            IEnumerable<UserResponseDto> userDtos = users.Select(u => new UserResponseDto
            {
                UserId = u.UserId,
                LastName = u.LastName,
                FirstName = u.FirstName,
                Email = u.Email,
                IsAdmin = u.IsAdmin
            });
            
            return userDtos;
        }

        public async Task<UserResponseDto> GetUserByEmailAsync(string email, string? password = null)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            
            if (user == null || (string.IsNullOrEmpty(password) ? false : user.Password != password))
            {
                return null;
            }

            return (new UserResponseDto
            {
                UserId = user.UserId,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsAdmin = user.IsAdmin
            });
        }
        
        public async Task<UserResponseDto> GetUserByIdAsync(string id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            
            return (new UserResponseDto
            {
                UserId = user.UserId,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsAdmin = user.IsAdmin
            });
        }

        public async Task InsertOneAsync(UserRequestDto userDto)
        {
            User user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Password = userDto.Password,
                IsActivated = false,
                IsAdmin = false
            };

           await _userRepository.InsertOneAsync(user);
        }
    }
}

