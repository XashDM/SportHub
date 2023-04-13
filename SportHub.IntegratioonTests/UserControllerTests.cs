using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using MySql.Data.MySqlClient;
using NUnit.Framework;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Controllers;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;

namespace SportHub.IntegratioonTests
{
    public class UserControllerTests
    {
        [Test]
        public async Task NewUserRequest_InsertedIntoDatabase_NewUserCreated()
        {
            // Arrange

            var loggerMock = new Mock<ILogger<UserController>>();
            var userService = CreateUserService();
                        
            var userController = new UserController(loggerMock.Object, userService);

            // Act

            var actualResult = await userController.InsertUserAsync(new Data.DTO.UserRequestDto());

            // Assert

            Assert.IsTrue(actualResult is BadRequestObjectResult);
        }

        private IUserService CreateUserService()
        {
            var connectionFactoryMock = new Mock<IDbConnectionFactory>();
            connectionFactoryMock.Setup(factory => factory.GetConnection()).Returns(new MySqlConnection(string.Empty));

            var userRepository = new UserRepository(connectionFactoryMock.Object);
            var userService = new UserService(userRepository);

            return userService;
        }
    }
}