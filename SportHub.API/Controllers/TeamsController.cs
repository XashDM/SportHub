using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamsService _TeamsService;
        private readonly ILogger<CategoryController> _logger;
        private readonly IMapper _mapper;

        public TeamsController(ITeamsService TeamsService, ILogger<CategoryController> logger,IMapper mapper)
        {
            _TeamsService = TeamsService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllTeamsAsync()
        {
            var Teams = await _TeamsService.GetAllTeamsAsync();

            return Ok(Teams);
        }

        [HttpGet("{TeamId}")]
        public async Task<IActionResult> GetTeamByIdAsync([FromRoute] string TeamId)
        {
            try
            {
                var team = await _TeamsService.GetTeamByIdAsync(TeamId);

                if (team == null)
                {
                    return NotFound("Team does not exist");
                }

                return Ok(team);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("subcategory/{SubCategoryId}")]
        public async Task<IActionResult> GetTeamBySubCategoryIdAsync([FromRoute] string SubCategoryId)
        {
            try
            {
                var teams = await _TeamsService.GetTeamsBySubcategoryIdAsync(SubCategoryId);

                return Ok(teams);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewTeamAsync([FromBody] TeamCreateDto teamCreateDto)
        {

            try
            {
                Team team = _mapper.Map<TeamCreateDto, Team>(teamCreateDto);

                var NewTeamId = await _TeamsService.CreateTeamAsync(team);
                return Ok(NewTeamId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{TeamId}")]
        public async Task<IActionResult> UpdateTeamAsync([FromRoute] string TeamId, [FromBody] TeamChangeDto teamChangeDto)
        {
            try
            {
                var team = await _TeamsService.GetTeamByIdAsync(TeamId);

                if (team == null)
                {
                    return NotFound("Team does not exist");
                }

                await _TeamsService.UpdateTeamAsync(TeamId, teamChangeDto);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{TeamId}/subcategory")]
        public async Task<IActionResult> UpdateSubcategoryOfTeamAsync([FromRoute] string TeamId, [FromBody] string SubCategoryId)
        {
            try
            {
                var team = await _TeamsService.GetTeamByIdAsync(TeamId);

                if (team == null)
                {
                    return NotFound("Team does not exist");
                }

                await _TeamsService.UpdateSubcategoryOfTeamAsync(TeamId, SubCategoryId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{TeamId}")]
        public async Task<IActionResult> DeleteTeamAsync([FromRoute] string TeamId)
        {
            try
            {
                var team = await _TeamsService.GetTeamByIdAsync(TeamId);

                if (team == null)
                {
                    return NotFound("Team does not exist");
                }

                await _TeamsService.DeleteTeamAsync(TeamId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}