using AutoMapper;
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
    private readonly ILogger<AuthController> _logger;
    private readonly IMapper _mapper;
    private readonly string  _frontendUrl;
    public AuthController(IConfiguration config, ILogger<AuthController> logger, IUserService userService, 
        IJwtService jwtService, IMapper mapper)
    {
        _userService = userService;
        _jwtService = jwtService;
        _logger = logger;
        _mapper = mapper;
        _frontendUrl = config.GetSection("Frontend")["Url"];
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
            
            JwtResponse jwtResponse = await _jwtService.GenerateTokensAsync(user);
            
            UserResponseDto userDto =  _mapper.Map<User, UserResponseDto>(jwtResponse.User);

            Response.Cookies.Append(
                "refreshToken",
                jwtResponse.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict
                }
            );
            
            UserLoginResponseDto response = new UserLoginResponseDto
            {
                AccessToken = jwtResponse.AccessToken,
                User = userDto
            };
            
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
            
            if (refreshToken == null || !_jwtService.ValidateToken(refreshToken))
            {
                return Unauthorized();
            }
            
            var userId =  await _jwtService.GetIdByRefreshTokenAsync(refreshToken);

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserByIdAsync(userId);
            
            if (user == null)
            {
                return Unauthorized();
            }
            
            var jwtResponse = await _jwtService.GenerateTokensAsync(user);
            
            UserResponseDto userDto =  _mapper.Map<User, UserResponseDto>(jwtResponse.User);

            // TODO    : Make it more simple   
            return Ok(new
            {
                AccessToken=jwtResponse.AccessToken,
                User = userDto
            });
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
    
    [HttpGet("activate/{token}")]
    [AllowAnonymous]
    public async Task<IActionResult> ActivateAccountAsync(string token)
    {
        try
        {
            var isActivated = await _userService.ActivateUserAccountAsync(token);
            
            if (isActivated)
            {
                return Redirect($"{_frontendUrl}/log-in");  
            }
            
            return Redirect($"{_frontendUrl}/activate-account");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("changePassword")]
    [AllowAnonymous]
    public async Task<IActionResult> ChangePasswordAsync(string token, string password)
    {
        try
        {
            var (isSuccess, errorMessage) = await _userService.ChangePasswordAsync(token, password);
            
            if (isSuccess)
            {
                return Ok();
            }
            
            return BadRequest(errorMessage);
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
            bool isSent = await _userService.SendResetPasswordLinkAsync(email);

            if (isSent)
            {
                return Ok(); 
            }
            
            return BadRequest();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> InsertUserAsync([FromBody] UserRequestDto userDto)
    {
        try
        {
            User user = _mapper.Map<UserRequestDto, User>(userDto);
            
            await _userService.CreateUserAsync(user);

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}  

