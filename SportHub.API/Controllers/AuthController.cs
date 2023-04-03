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

        JwtResponse response = _jwtService.GenerateTokens(user).Result;
        
        Response.Cookies.Append(
            "refreshToken",
            response.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            }
        );

        return Ok(response);
    }
    
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        
        if (refreshToken == null || !_jwtService.ValidateToken(refreshToken))
        {
            return Unauthorized();
        }
        
        var userEmail =  await _jwtService.GetUserEmailAsync(refreshToken);

        if (userEmail == null)
        {
            return Unauthorized();
        }

        var user = await _userService.GetUserByEmailAsync(userEmail);
        
        if (user == null)
        {
            return Unauthorized();
        }
        
        var response = await _jwtService.GenerateTokens(user);
        
        return Ok(response);
    }
}  

