using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.API.Helpers;
using SportHub.Models;
using SportHub.Services;

namespace SportHub.Controllers;

[AllowAnonymous]
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
    [AllowAnonymous]
    public IActionResult LogIn(string email, string password)
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

    [HttpPost("logout")]
    public async Task<IActionResult> LogOut()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            return StatusCode(404);
        }
        // if (!_jwtService.ValidateToken(refreshToken) || _jwtService.DeleteRefreshToken(refreshToken))
        if (_jwtService.DeleteRefreshToken(refreshToken))
        {
            return Ok();
        }
      
        return StatusCode(500);
    }
}  

