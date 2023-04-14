using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.Entities;
using SportHub.Data.DTO;

namespace SportHub.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    
    private readonly IUserService _usersService;
    
    public UserController(ILogger<UserController> logger, IUserService userService)
    {
        _logger = logger;
        _usersService = userService;
    }

    [HttpGet("all")]
    [Authorize("AdminPolicy")]    
    public async Task<IActionResult> GetAllUsersAsync()
    {
        var users = await _usersService.GetUsersAsync();
    
        return Ok(users);

    }
    
    [HttpGet("Email/{email}")]
    [Authorize("AdminPolicy")]    
    public async Task<IActionResult> GetByEmailAsync([FromRoute] string email)
    {
        var user = await _usersService.GetUserByEmailAsync(email);
        
        if (user == null)
        {
            return NotFound("User not found");
        }
    
        return Ok(new UserResponseDto
        {
            UserId = user.UserId,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            IsAdmin = user.IsAdmin
        });
    }
    
    [HttpGet("Id/{id}")]
    [Authorize("AdminPolicy")]    
    public async Task<IActionResult> GetByIdAsync([FromRoute] string id)
    {
        var user = await _usersService.GetUserByIdAsync(id);
        
        if (user == null)
        {
            return NotFound("User not found");
        }
    
        return Ok();
    }
    
    [HttpPost(Name = "InsertUser")]
    public async Task<IActionResult> InsertUserAsync([FromBody] UserRequestDto user)
    {
        try
        {
            await _usersService.InsertOneAsync(user);

            var insertedUser = await _usersService.GetUserByEmailAsync(user.Email);

            return Ok(insertedUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
}
