using AutoMapper;
using Moq;
using Org.BouncyCastle.Math.EC;
using SportHub.API;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.UnitTests
{
    public class UserServiceTests
    {
        private User _testUser;
        private UserResponseDto _testUserResponseDto;
        private UserRequestDto _testUserRequestDto;
        private IMapper _mapper;
        private UserService _userService;
        private Mock<IUserRepository> _userRepositoryMock;

        [SetUp]
        public void SetUp()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserResponseDto>();
                cfg.CreateMap<User, UserRequestDto>();
                cfg.CreateMap<UserRequestDto, User>()
                    .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
                cfg.CreateMap<UserGoogleDto, User>()
                    .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.FirstName,
                        opt => opt.MapFrom(src => src.Name.Split(" ", StringSplitOptions.RemoveEmptyEntries)[1]))
                    .ForMember(dest => dest.LastName,
                        opt => opt.MapFrom(src => src.Name.Split(" ", StringSplitOptions.RemoveEmptyEntries)[0]));
            });
            
            _mapper = config.CreateMapper();

            _userRepositoryMock = new Mock<IUserRepository>();
            
            _testUser = new User
            {
                UserId = "testUserId", 
                FirstName = "testUserFirstName", 
                LastName = "testUserLastName", 
                Email = "testUserEmail@gmail.com", 
                Password = "testUserPassword", 
                IsActivated = true, 
                IsAdmin = false 
            };

            _testUserResponseDto = _mapper.Map<User, UserResponseDto>(_testUser);
            _testUserRequestDto = _mapper.Map<User, UserRequestDto>(_testUser);
            _userService = new UserService(_userRepositoryMock.Object, _mapper);

        }
        
        
        [Test]
        [TestCase("")]
        [TestCase(null)]
        public async Task NoPassowrd_SearchingForUser_UserIsNotReturned(string password)
        {
            // Arrange
            
            // Act

            var expectedUser = await _userService.GetUserByEmailAndPasswordAsync(_testUser.Email, password);

            // Assert   

            Assert.IsNull(expectedUser);
        }
        
        [Test]
        [TestCase("testUserEmail@gmail.com", "incorrect_password")]
        [TestCase("incorrect_email", "testUserPassword")]
        public async Task IncorrectPasswordOrEmail_SearchingForUser_UserIsNotReturned(string email, string password)
        {
            // Arrange

            _userRepositoryMock.Setup(foo => foo.GetUserByEmailAsync(It.IsAny<string>()).Result)
                .Returns((string email) => email == "testUserEmail@gmail.com" ? _testUser : null);
            
            
            // Act

            var expectedUser = await _userService.GetUserByEmailAndPasswordAsync(email, password);

            // Assert   

            Assert.IsNull(expectedUser);
        }
        
        [TestCase("testUserEmail@gmail.com", "testUserPassword")]
        public async Task CorrectPasswordAndEmail_SearchingForUser_UserResponseDtoIsReturned(string email, string password)
        {
            // Arrange

            _userRepositoryMock.Setup(foo => foo.GetUserByEmailAsync(It.IsAny<string>()).Result)
                .Returns((string email) => email == "testUserEmail@gmail.com" ? _testUser : null);
            
            // Act

            UserResponseDto user = await _userService.GetUserByEmailAndPasswordAsync(email, password);

            // Assert   
            Assert.IsNotNull(user);
            Assert.IsInstanceOf<UserResponseDto>(user);
            Assert.AreEqual(_testUserResponseDto, user);
        }
        
        [Test]
        public async Task NoParametersGiven_GettingAllUsers_ReturnsListOfUserResponseDto()
        {
            // Arrange
            var users = new List<User>
            {
                new User { UserId = "1", Email = "test1@test.com", FirstName = "John", LastName = "Doe", Password = "password1", IsActivated = true, IsAdmin = false },
                new User { UserId = "2", Email = "test2@test.com", FirstName = "Jane", LastName = "Doe", Password = "password2", IsActivated = true, IsAdmin = true },
                new User { UserId = "3", Email = "test3@test.com", FirstName = "Bob", LastName = "Smith", Password = "password3", IsActivated = false, IsAdmin = false }
            };
            
            _userRepositoryMock.Setup(repo => repo.GetAllUsersAsync()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetUsersAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IEnumerable<UserResponseDto>>(result);
            Assert.That(3, Is.EqualTo(result.Count()));
        }
        
        [Test]
        [TestCase("testUserEmail@gmail.com")]
        public async Task CorrectUserEmailProvided_SearchingForUserByEmail_UserResponseDtoIsReturned(string email)
        {
            // Arrange
            _userRepositoryMock.Setup(foo => foo.GetUserByEmailAsync(It.IsAny<string>()).Result)
                .Returns((string email) => email == "testUserEmail@gmail.com" ? _testUser : null);

            // Act
            UserResponseDto result = await _userService.GetUserByEmailAsync(email);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<UserResponseDto>(result);
        }
        
        [Test]
        [TestCase("testUserId")]
        public async Task CorrectUserIdProvided_SearchingForUserIdEmail_UserResponseDtoIsReturned(string id)
        {
            // Arrange
            _userRepositoryMock.Setup(foo => foo.GetUserByIdAsync(It.IsAny<string>()).Result)
                .Returns((string id) => id == _testUser.UserId ? _testUser : null);

            // Act
            UserResponseDto result = await _userService.GetUserByIdAsync(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<UserResponseDto>(result);
        }
    
        [Test]
        [TestCase("incorrect_user_id")]
        public async Task IncorrectUserIdProvided_SearchingForUserIdEmail_UserResponseDtoIsReturned(string id)
        {
            // Arrange
            _userRepositoryMock.Setup(foo => foo.GetUserByIdAsync(It.IsAny<string>()).Result)
                .Returns((string id) => id == _testUser.UserId ? _testUser : null);

            // Act
            UserResponseDto result = await _userService.GetUserByIdAsync(id);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task CorrectUserRequestDtoProvided_InsertingUserInToDb_UserIdReturned()
        {
            // Arrange
            _userRepositoryMock.Setup(foo => foo.InsertOneAsync(It.IsAny<User>()).Result)
                .Returns((User user) => user.UserId);

            // Act
            string result = await _userService.InsertOneAsync(_testUserRequestDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<string>(result);
        }

    }
}