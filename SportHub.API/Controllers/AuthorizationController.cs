using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Controllers;

[AllowAnonymous]
[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthController> _logger;
    public AuthController(ILogger<AuthController> logger, IUserService userService, 
        IJwtService jwtService, IEmailService emailService)
    {
        _userService = userService;
        _jwtService = jwtService;
        _logger = logger;
        _emailService = emailService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> LogInAsync(string email, string password)
    {
        try
        {
            var user = await _userService.GetUserByEmailAndPasswordAsync(email, password);

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
    public async Task<IActionResult> RefreshAsync()
    {
        try
        {
            var refreshToken = Request.Cookies["refreshToken"];
            
            if (refreshToken == null || string.IsNullOrEmpty(_jwtService.ValidateToken(refreshToken)))
            {
                return Unauthorized();
            }
            
            var userId =  await _jwtService.GetIdByTokenAsync(refreshToken);

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserByIdAsync(userId);
            
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
    public async Task<IActionResult> LogOutAsync()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            return StatusCode(404);
        }

        try
        {
            if(string.IsNullOrEmpty(_jwtService.ValidateToken(refreshToken)))
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
    
    [HttpGet("activate/{token}")]
    [AllowAnonymous]
    public async Task<IActionResult> ActivateAccountAsync(string token)
    {
        try
        {
            string userId = _jwtService.ValidateToken(token);
            
            if(!string.IsNullOrEmpty(userId))
            {
                await _userService.ActivateUserAccountAsync(userId);
                return Redirect("http://localhost:3000/log-in");
            }
            
            return BadRequest("Activate token expiration time passed");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("changePassword")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPasswordAsync(string token, string password)
    {
        try
        {
            string userId = _jwtService.ValidateToken(token);
            
            if(string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid token");
            }

            var user = await _userService.GetUserByIdAsync(userId);
            
            if (user == null)
            {
                return BadRequest("Account do not exists");
            }
            
            await _userService.ChangePasswordAsync(userId, password);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("requestResetPassword/{email}")]
    [AllowAnonymous]
    public async Task<IActionResult> SendResetPasswordLinkAsync(string email)
    {
        try
        {
            var insertedUser = await _userService.GetUserByEmailAsync(email);
            
            var activationToken = _jwtService.GenerateActivationToken(insertedUser);
            
            string activationLink = $"http://localhost:3000/password-change/{activationToken}";
            
            _emailService.SendPasswordResetLinkAsync(email, activationLink);
            
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> InsertUserAsync([FromBody] UserRequestDto user)
    {
        try
        {
            if (user.Password == null || user.Email == null)
            {
                return BadRequest("No password or email provided");
            }
            
            // Check if object is correct
            if (user.UserId != null || user.FirstName == null || user.LastName == null)
            {
                return BadRequest("Not correct object provided");
            }
            
            await _userService.InsertOneAsync(user);
            
            var insertedUser = await _userService.GetUserByEmailAsync(user.Email);
            
            var activationToken = _jwtService.GenerateActivationToken(insertedUser);
            
            string activationLink = $"https://localhost:7168/Auth/activate/{activationToken}";

            await _emailService.SendActivationEmailAsync(user.Email, activationLink);

            return Ok(activationLink);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}  

