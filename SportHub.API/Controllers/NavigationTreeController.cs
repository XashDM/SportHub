using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using System.Reflection.Metadata.Ecma335;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NavigationTreeController : ControllerBase
    {
        private readonly INavigationTreeService _NavigationTreeService;
        private readonly ILogger<NavigationTreeController> _logger;
        private readonly IMapper _mapper;

        public NavigationTreeController(INavigationTreeService NavigationTreeService, ILogger<NavigationTreeController> logger,IMapper mapper)
        {
            _NavigationTreeService = NavigationTreeService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost("append")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> AppendNavigationTree([FromBody] NavigationTree navigationTree)
        {
            try 
            {
                await _NavigationTreeService.AppendNavigationTree(navigationTree);
            } 
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
            return Ok();
        }

        [HttpDelete("delete")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> DeleteFromNavigationTree([FromBody] NavigationTreeDeleteDTO navigationTree)
        {
            try
            {
                await _NavigationTreeService.DeleteFromNavigationTree(navigationTree);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }

        [HttpPut("hide")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> HideNavigationTreeElements([FromBody] NavigationTreeHideDTO navigationTree)
        {
            try
            {
                await _NavigationTreeService.HideNavigationTree(navigationTree);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }
    }
}