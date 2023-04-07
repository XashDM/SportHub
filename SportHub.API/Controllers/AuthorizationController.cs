using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.Entities;

namespace SportHub.Controllers;

[AllowAnonymous]
[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;
    private readonly ILogger<AuthController> _logger;
    public AuthController(ILogger<AuthController> logger, IUserService userService, IJwtService jwtService)
    {
        _userService = userService;
        _jwtService = jwtService;
        _logger = logger;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> LogIn(string email, string password)
    {
        try
        {
            var user = await _userService.GetUserByEmailAsync(email, password);

            if (user == null)
            {
                return Unauthorized();
            }

        
            JwtResponse response = await _jwtService.GenerateTokensAsync(user);
            
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
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        try
        {
            var refreshToken = Request.Cookies["refreshToken"];
            
            if (refreshToken == null || !_jwtService.ValidateToken(refreshToken))
            {
                return Unauthorized();
            }
            
            var userEmail =  await _jwtService.GetEmailByTokenAsync(refreshToken);

            if (userEmail == null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserByEmailAsync(userEmail);
            
            if (user == null)
            {
                return Unauthorized();
            }
            
            var response = await _jwtService.GenerateTokensAsync(user);
                    
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
        
    }

    [HttpPost("logout")]
    public async Task<IActionResult> LogOut()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            return StatusCode(404);
        }

        try
        {
            if(!_jwtService.ValidateToken(refreshToken))
            {
                return Ok();
            }
            
            await _jwtService.DeleteRefreshTokenAsync(refreshToken);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}  

