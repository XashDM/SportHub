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
        
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<UserResponseDto>> GetUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            
            IEnumerable<UserResponseDto> userDtos = _mapper.Map<IEnumerable<UserResponseDto>>(users);
            
            return userDtos;
        }

        public async Task<UserResponseDto> GetUserByEmailAsync(string email, string? password = null)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            
            if (user == null || (string.IsNullOrEmpty(password) ? false : user.Password != password))
            {
                return null;
            }

            return _mapper.Map<User, UserResponseDto>(user);
        }
        
        public async Task<UserResponseDto> GetUserByIdAsync(string id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            return _mapper.Map<User, UserResponseDto>(user);
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

        public async Task UpdateUserAsync(UserRequestDto newUser)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(newUser.UserId);
            
            var updatedUser = _mapper.Map<UserRequestDto, User>(newUser, existingUser);

            await _userRepository.UpdateUserAsync(updatedUser);
        }
        
    }
}

