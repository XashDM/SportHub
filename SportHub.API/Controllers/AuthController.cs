using Microsoft.AspNetCore.Mvc;
using SportHub.API.Helpers;
using SportHub.Models;
using SportHub.Services;

namespace SportHub.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;
    
    public AuthController(IUserService userService, IJwtService jwtService)
    {
        _userService = userService;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login(string email, string password)
    {
        var user = _userService.GetUserByEmailAsync(email).Result;

        if (user == null || user.Password != password)
        {
            return Unauthorized();
        }

        JwtResponse token = _jwtService.GenerateSecurityToken(user);

        return Ok(token);
    }
}  

