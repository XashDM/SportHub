using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class LocationController : ControllerBase
	{
		private readonly ILocationService _locationService;
		private readonly ILogger<LocationController> _logger;

		public LocationController(ILocationService locationService, ILogger<LocationController> logger)
		{
			_locationService = locationService;
			_logger = logger;
		}

		[HttpGet("all")]
		public async Task<IActionResult> GetLocationsAsync()
		{
			try
			{
				var locations = await _locationService.GetLocationsAsync();

				return Ok(locations);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
	}
}