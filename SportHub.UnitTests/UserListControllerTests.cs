using AutoMapper;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using SportHub.API;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;
using SportHub.Controllers;
using SportHub.Business.Interfaces;
using Microsoft.AspNetCore.Http;

namespace SportHub.UnitTests
{

    [TestFixture]
    public class UsersControllerTests
    {
        private UserController _controller;
        [Test]
        public async Task GetUsersListAsync_ReturnsUnauthorizedWithoutAdminPolicy()
        {

            // Act
            var result = await _controller.GetAllUsersListAsync();

            // Assert
            var unauthorizedResult = result as UnauthorizedResult;
            Assert.IsNotNull(unauthorizedResult);
        }

    }
}