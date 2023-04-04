using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.Services;

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

    [HttpGet(Name = "GetUsers")]
    [Authorize("AdminPolicy")]    
    public async Task<IActionResult> Get()
    {
        var users = await _usersService.GetUsersAsync();
    
        return Ok(users);

    }
    
    [HttpGet("{email}", Name = "GetUserByEmail")]
    [Authorize]  
    public async Task<IActionResult> GetByEmail(string email)
    {
        var user = await _usersService.GetUserByEmailAsync(email);
    
        return Ok(user);
    }
}
