using Moq;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.Interfaces;
using SportHub.Data.Entities;
using NUnit.Framework;

namespace SportHub.Tests
{
    public class UserServiceTests
    {
        // Given - no password
        // When - searching for user
        // Then - User is not returned
        [Test]
        [TestCase("")]
        [TestCase(null)]
        public async Task NoPassowrd_SearchingForUser_UserIsNotReturned(string password)
        {
            // Arrange
            var userRepositoryMock = new Mock<IUserRepository>();
            User? user = new User();
            userRepositoryMock.Setup(foo => foo.GetUserByEmailAsync(It.IsAny<string>()).Result).Returns(user);

            IUserService userService = new UserService(userRepositoryMock.Object);

            // Act

            var expectedUser = await userService.GetUserByEmailAsync("email", password);

            // Assert

            Assert.IsNull(expectedUser);
        }
    }
}