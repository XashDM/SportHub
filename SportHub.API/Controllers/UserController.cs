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
    public async Task<IActionResult> Get()
    {
        var users = await _usersService.GetUsersAsync();
    
        return Ok(users);

    }
    
    [HttpGet("{id}", Name = "GetUserById")]
    public async Task<IActionResult> GetById(string id)
    {
        var user = await _usersService.GetUserByIdAsync(id);
    
        return Ok(user);
    }
}
