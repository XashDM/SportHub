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
                SecondName = u.SecondName,
                FirstName = u.FirstName,
                Email = u.Email,
                IsAdmin = u.IsAdmin
            });
            
            return userDtos;
        }

        public async Task<User> GetUserByEmailAsync(string email, string? password = null)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            
            if (user == null || (string.IsNullOrEmpty(password) ? false : user.Password != password))
            {
                return null;
            }

            return user;
        }

        public async Task InsertOneAsync(UserRequestDto userDto)
        {
            User user = new User
            {
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                SecondName = userDto.SecondName,
                Password = userDto.Password,
                IsActivated = false,
                IsAdmin = false
            };

           await _userRepository.InsertOneAsync(user);
        }
    }
}

