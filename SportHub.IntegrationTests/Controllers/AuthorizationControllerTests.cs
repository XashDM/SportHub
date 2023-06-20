using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using MySql.Data.MySqlClient;
using SportHub.API;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Controllers;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;

namespace SportHub.IntegrationTests.Controllers
{
    [TestFixture]
    [SingleThreaded]
    public class AuthorizationControllerTests
    {
        private Mock<ILogger<AuthController>> _loggerMock;
        private Mock<ILogger<JwtService>> _jwtLoggerMock;

        private AuthController _authController;
        private IUserService _userService;
        private IJwtService _jwtService;
        private IEmailService _emailService;
        private IMapper _mapper;
        private IConfiguration _configuration;
        
        private User _testUser;
        private UserRequestDto _testUserRequestDto;
        private string _refreshToken;
        private string _userId;
        
        [SetUp]
        public void SetUp()
        {
            // Order DO matter
            _loggerMock = new Mock<ILogger<AuthController>>();
            _jwtLoggerMock = new Mock<ILogger<JwtService>>();
            _configuration = CreateConfiguration();
            _mapper = CreateMapper();
            _emailService = CreateEmailService();
            _jwtService = CreateJwtService();
            _userService = CreateUserService();
            
            _authController = new AuthController(_configuration, _loggerMock.Object, _userService, _jwtService, _mapper);
            
            // Prepare cookies response context for controller
            var httpContext = new Mock<HttpContext>();
            var cookies = new Mock<IResponseCookies>();
            var response = new Mock<HttpResponse>();
            
            response.SetupGet(r => r.Cookies).Returns(cookies.Object);
            
            httpContext.SetupGet(c => c.Response).Returns(response.Object);

            _authController.ControllerContext.HttpContext = httpContext.Object;
            
            _testUser = new User
            {
                FirstName = "testUserFirstName", 
                LastName = "testUserLastName", 
                Email = "testUserEmail@gmail.com", 
                Password = "testUserPassword",
            };
            
            _testUserRequestDto = new UserRequestDto
            {
                FirstName = "testUserFirstName", 
                LastName = "testUserLastName", 
                Email = "testUserEmail@gmail.com", 
                Password = "testUserPassword",
            };
        }

        [Test, Order(1)]
        public async Task RegistrationRequest_InsertedIntoDatabase_ActivationEmailSent()
        {
            // Act

            var actualResult = await _authController.InsertUserAsync(_testUserRequestDto);
            
            // Assert

            Assert.IsTrue(actualResult is OkResult);
        }
        
        [Test, Order(2)]
        public async Task ActivationRequest_ValidActivateToken_ActivateAccountAndRedirectUserToLogIn()
        {
            // Arrange
            
            var userFromDb = await _userService.GetUserByEmailAsync(_testUser.Email);
            string ActivationToken = _jwtService.GenerateActivationToken(userFromDb);
            
            // Act

            var actualResult = await _authController.ActivateAccountAsync(ActivationToken);

            // Assert

            Assert.IsTrue(actualResult is RedirectResult);
            RedirectResult redirectResult = actualResult as RedirectResult;
            Assert.AreEqual("http://localhost:3000/log-in", redirectResult.Url);
        }
        
        [Test, Order(3)]
        public async Task LoginRequest_UserAccountActivated_ReturnTokensAndUserObj()
        {
            // Act

            var actualResult = await _authController.LogInAsync(_testUser.Email, _testUser.Password);

            // Assert

            Assert.IsTrue(actualResult is OkObjectResult);

            var successResponse = actualResult as OkObjectResult;
            UserLoginResponseDto responseData = successResponse.Value as UserLoginResponseDto;
            
            Assert.IsNotNull(responseData.AccessToken);
            Assert.IsNotNull(responseData.User);
            Assert.AreEqual(_testUser.Email,responseData.User.Email);
            
            // Prepare data for next tests
            _userId = responseData.User.UserId;
        }
        
        [Test, Order(4)]
        public async Task ResetPasswordRequest_UserAccountExists_SentEmailWithResetPasswordBtn()
        {
            // Act

            var actualResult = await _authController.SendResetPasswordLinkAsync(_testUser.Email);

            // Assert

            Assert.IsTrue(actualResult is OkResult);
        }
        
        [Test, Order(5)]
        public async Task ChangePasswordRequest_ValidResetToken_PasswordChangedSuccessfully()
        {
            // Arrange
            var userFromDb = await _userService.GetUserByEmailAsync(_testUser.Email);
            string ActivationToken = _jwtService.GenerateActivationToken(userFromDb);
            
            // Act

            var actualResult = await _authController.ChangePasswordAsync(ActivationToken, "newPassword");

            // Assert

            Assert.IsTrue(actualResult is OkResult);
        }
        
        [Test, Order(6)]
        public async Task RefreshAccessTokenRequest_ValidRefreshTokenInCookies_ReturnNewAccessTokenAndUserData()
        {
            // Arrange
            _refreshToken = await _jwtService.GetRefreshTokenByUserId(_userId);
            
            var httpContext = new Mock<HttpContext>();
            var request = new Mock<HttpRequest>();
            
            request.SetupGet(r => r.Cookies["refreshToken"]).Returns(_refreshToken);
            
            httpContext.SetupGet(c => c.Request).Returns(request.Object);

            _authController.ControllerContext.HttpContext = httpContext.Object;
            
            // Act

            var actualResult = await _authController.RefreshAsync();

            // Assert

            Assert.IsTrue(actualResult is OkObjectResult);
        }
        
        [Test, Order(7)]
        public async Task LogOutRequest_UserLoggedIn_DeleteRefreshToken()
        {
            // Arrange
            _refreshToken = await _jwtService.GetRefreshTokenByUserId(_userId);
            
            var httpContext = new Mock<HttpContext>();
            var request = new Mock<HttpRequest>();
            
            request.SetupGet(r => r.Cookies["refreshToken"]).Returns(_refreshToken);
            
            httpContext.SetupGet(c => c.Request).Returns(request.Object);

            _authController.ControllerContext.HttpContext = httpContext.Object;
            
            // Act

            var actualResult = await _authController.LogOutAsync();

            // Assert

            Assert.IsTrue(actualResult is OkResult);
        }

        private IUserService CreateUserService()
        {
            var connectionFactoryMock = new Mock<IDbConnectionFactory>();
            connectionFactoryMock.Setup(factory => factory.GetConnection())
                .Returns(new MySqlConnection("server=localhost;database=SportHub;user=root;password=rootadmin2022"));
            
            var userRepository = new UserRepository(connectionFactoryMock.Object);
            var userService = new UserService(userRepository, _mapper, _jwtService, _emailService);

            return userService;
        }
        
        private IJwtService CreateJwtService()
        {
            var connectionFactoryMock = new Mock<IDbConnectionFactory>();
            connectionFactoryMock.Setup(factory => factory.GetConnection())
                .Returns(new MySqlConnection("server=localhost;database=SportHub;user=root;password=rootadmin2022"));
            
            var tokenRepository = new TokenRepository(_configuration, connectionFactoryMock.Object);
            var tokenService = new JwtService(_configuration, tokenRepository, _jwtLoggerMock.Object);

            return tokenService;
        }
        
        private IEmailService CreateEmailService()
        {
            var emailService = new EmailService(_configuration);

            return emailService;
        }

        private IMapper CreateMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });

            return new Mapper(config);
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