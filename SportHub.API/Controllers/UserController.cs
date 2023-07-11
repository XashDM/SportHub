using AutoMapper;
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
    private readonly IMapper _mapper;
    
    public UserController(ILogger<UserController> logger, IMapper mapper, IUserService userService)
    {
        _logger = logger;
        _usersService = userService;
        _mapper = mapper;
    }

    [HttpGet("all")]
    [Authorize("AdminPolicy")]    
    public async Task<IActionResult> GetAllUsersAsync()
    {
        IEnumerable<User> users = await _usersService.GetUsersAsync();
    
        var usersDto = _mapper.Map<IEnumerable<UserResponseDto>>(users);
        
        return Ok(usersDto);

    }

    [HttpGet("users")]
    //[Authorize("AdminPolicy")]
    public async Task<IActionResult> GetAllUsersListAsync()
    {
        IEnumerable<User> users = await _usersService.GetUsersAsync();
        var usersDto = _mapper.Map<IEnumerable<UserResponseDto>>(users);
        return Ok(usersDto);
    }

    [HttpGet("Email/{email}")]
    [Authorize("AdminPolicy")]    
    public async Task<IActionResult> GetByEmailAsync([FromRoute] string email)
    {
        User user = await _usersService.GetUserByEmailAsync(email);
        
        if (user == null)
        {
            return NotFound("User not found");
        }

        var userDto = _mapper.Map<User, UserResponseDto>(user);
    
        return Ok(userDto);
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
    
        var userDto = _mapper.Map<User, UserResponseDto>(user);
        
        return Ok(userDto);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUserAsync([FromBody] UserUpdateRequestDto userUpdatesDto)
    {
        try
        {
            var userUpdates = _mapper.Map<UserUpdateRequestDto, User>(userUpdatesDto);
            
            await _usersService.UpdateUserAsync(userUpdates);
            
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}
