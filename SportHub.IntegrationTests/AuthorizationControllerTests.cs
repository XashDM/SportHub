using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using MySql.Data.MySqlClient;
using SportHub.API;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Controllers;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;
using Microsoft.Extensions.Configuration;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.IntegrationTests
{
    public class AuthorizationControllerTests
    {
        private Mock<ILogger<AuthController>> _loggerMock;
        private AuthController _authController;
        private IUserService _userService;
        private IJwtService _jwtService;
        private IEmailService _emailService;
        private User _testUser;
        private UserRequestDto _testUserRequestDto;
        
        [SetUp]
        public void SetUp()
        {
            _loggerMock = new Mock<ILogger<AuthController>>();
            _userService = CreateUserService();
            _jwtService = CreateJwtService();
            _emailService = CreateEmailService();
            _authController = new AuthController(_loggerMock.Object, _userService, _jwtService, _emailService); 
            
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
            
            _testUserRequestDto = new UserRequestDto
            {
                FirstName = "testUserFirstName", 
                LastName = "testUserLastName", 
                Email = "testUserEmail@gmail.com", 
                Password = "testUserPassword",
            };
        }

        [Test]
        public async Task RegistrationRequest_InsertedIntoDatabase_ActivationEmailSent()
        {
            // Arrange

            
            // Act

            var actualResult = await _authController.InsertUserAsync(_testUserRequestDto);

            // Assert

            Assert.IsTrue(actualResult is OkObjectResult);
        }

        private IUserService CreateUserService()
        {
            var connectionFactoryMock = new Mock<IDbConnectionFactory>();
            connectionFactoryMock.Setup(factory => factory.GetConnection())
                .Returns(new MySqlConnection("server=localhost;database=SportHub;user=root;password=rootadmin2022"));
            
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });
            
            var userRepository = new UserRepository(connectionFactoryMock.Object);
            var userService = new UserService(userRepository, new Mapper(config));

            return userService;
        }
        
        private IJwtService CreateJwtService()
        {
            var connectionFactoryMock = new Mock<IDbConnectionFactory>();
            connectionFactoryMock.Setup(factory => factory.GetConnection())
                .Returns(new MySqlConnection("server=localhost;database=SportHub;user=root;password=rootadmin2022"));
       
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(AppContext.BaseDirectory, "../../../../SportHub.API"))
                .AddJsonFile("appsettings.json", optional: true)
                .Build();
            
            var tokenRepository = new TokenRepository(configuration, connectionFactoryMock.Object);
            
            var tokenService = new JwtService(configuration, tokenRepository);

            return tokenService;
        }
        
        private IEmailService CreateEmailService()
        {
            
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(AppContext.BaseDirectory, "../../../../SportHub.API"))
                .AddJsonFile("appsettings.json", optional: true)
                .Build();
            
            var emailService = new EmailService(configuration);

            return emailService;
        }
    }
}