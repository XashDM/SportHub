using AutoMapper;
using Microsoft.Extensions.Configuration;
using Moq;
using SportHub.API;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.UnitTests
{
    public class UserServiceTests
    {
        private User _testUser;
        private IConfiguration _configuration;
        private IMapper _mapper;
        private UserService _userService;
        private Mock<IUserRepository> _userRepositoryMock;
        private Mock<IJwtService> _jwtServiceMock;
        private Mock<IEmailService> _emailServiceMock;

        [SetUp]
        public void SetUp()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });
            
            _mapper = new Mapper(config);
            _configuration = CreateConfiguration();

            _userRepositoryMock = new Mock<IUserRepository>();
            _jwtServiceMock = new Mock<IJwtService>();
            _emailServiceMock = new Mock<IEmailService>();
            
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
            
            _userRepositoryMock.Setup(foo => foo.GetUserByEmailAsync(It.IsAny<string>()).Result)
                .Returns((string email) => email == "testUserEmail@gmail.com" ? _testUser : null);
            
            _userService = new UserService(_configuration,_userRepositoryMock.Object, _mapper, 
                _jwtServiceMock.Object, _emailServiceMock.Object);

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
            // Act

            var expectedUser = await _userService.GetUserByEmailAndPasswordAsync(email, password);

            // Assert   

            Assert.IsNull(expectedUser);
        }
        
        [TestCase("testUserEmail@gmail.com", "testUserPassword")]
        public async Task CorrectPasswordAndEmail_SearchingForUser_UserResponseDtoIsReturned(string email, string password)
        {
            // Act

            User user = await _userService.GetUserByEmailAndPasswordAsync(email, password);

            // Assert   
            
            Assert.IsNotNull(user);
            Assert.IsInstanceOf<User>(user);
            // Assert.AreEqual(_testUserResponseDto, user);
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
            Assert.IsInstanceOf<IEnumerable<User>>(result);
            Assert.That(3, Is.EqualTo(result.Count()));
        }
        
        [Test]
        [TestCase("testUserEmail@gmail.com")]
        public async Task CorrectUserEmailProvided_SearchingForUserByEmail_UserResponseDtoIsReturned(string email)
        {
            // Act
            
            User result = await _userService.GetUserByEmailAsync(email);

            // Assert
            
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<User>(result);
        }
        
        [Test]
        [TestCase("testUserId")]
        public async Task CorrectUserIdProvided_SearchingForUserIdEmail_UserResponseDtoIsReturned(string id)
        {
            // Arrange
            
            _userRepositoryMock.Setup(foo => foo.GetUserByIdAsync(It.IsAny<string>()).Result)
                .Returns((string id) => id == _testUser.UserId ? _testUser : null);

            // Act
            
            User result = await _userService.GetUserByIdAsync(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<User>(result);
        }
    
        [Test]
        [TestCase("incorrect_user_id")]
        public async Task IncorrectUserIdProvided_SearchingForUserIdEmail_UserResponseDtoIsReturned(string id)
        {
            // Arrange
            
            _userRepositoryMock.Setup(foo => foo.GetUserByIdAsync(It.IsAny<string>()).Result)
                .Returns((string id) => id == _testUser.UserId ? _testUser : null);

            // Act
            
            User result = await _userService.GetUserByIdAsync(id);

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
            
            string result = await _userService.CreateUserAsync(_testUser);

            // Assert
            
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<string>(result);
        }
        
        private IConfiguration CreateConfiguration()
        {
            
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(AppContext.BaseDirectory, "../../../../SportHub.API"))
                .AddJsonFile("appsettings.json", optional: true)
                .Build();

            return configuration;
        }
    }
}