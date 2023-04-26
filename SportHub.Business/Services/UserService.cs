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

        public async Task<UserResponseDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            
            return _mapper.Map<User, UserResponseDto>(user);
        }
        
        public async Task<UserResponseDto> GetUserByEmailAndPasswordAsync(string email, string password)
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

            return _mapper.Map<User, UserResponseDto>(user);
        }
        
        public async Task<UserResponseDto> GetUserByIdAsync(string id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            return _mapper.Map<User, UserResponseDto>(user);
        }

        public async Task<string> InsertOneAsync(UserRequestDto userDto)
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
            
            
            string id = await _userRepository.InsertOneAsync(user);

            return id;
        }

        public async Task UpdateUserAsync(UserRequestDto newUser)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(newUser.UserId);
            
            var updatedUser = _mapper.Map<UserRequestDto, User>(newUser, existingUser);

            await _userRepository.UpdateUserAsync(updatedUser);
        }

        public async Task ActivateUserAccountAsync(string id)
        {
            await _userRepository.ActivateUserAccountAsync(id);
        }

        public async Task ChangePasswordAsync(string userId, string password)
        {
            await _userRepository.ChangePasswordAsync(userId, password);
        }


    }
}

