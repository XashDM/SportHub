using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Business.Interfaces;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BreakDownController : ControllerBase
    {
        private readonly IBreakDownService _breakDownService;
        private readonly ILogger<BreakDownController> _logger;
        private readonly IMapper _mapper;
        
        public BreakDownController(IBreakDownService breakDownService, ILogger<BreakDownController> logger, IMapper mapper)
        {
            _breakDownService = breakDownService;
            _logger = logger;
            _mapper = mapper;
        }
        
        [HttpGet()]
        public async Task<IActionResult> GetBreakDownsAsync([FromQuery] string languageId)
        {
            try
            {
                var breakDowns = await _breakDownService.GetBreakDownsAsync(languageId);

                return Ok(breakDowns);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost()]
        public async Task<IActionResult> CreateBreakDownsAsync([FromQuery] string languageId, [FromBody] IEnumerable<BreakDownRequest> breakDownsRequest)
        {
            try
            {
                var breakDowns = _mapper.Map<IEnumerable<BreakDown>>(breakDownsRequest);
                await _breakDownService.CreateBreakDownsAsync(languageId, breakDowns);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("GetArticles")]
        public async Task<IActionResult> GetBreakDownArticlesAsync([FromQuery] string languageId, bool? lastArticles = null,
            int? numberOfArticles = null)
        {
            try
            {
                var articles = await _breakDownService.GetBreakDownsArticlesAsync(languageId,
                    new ArticleSearchOptions{
                    LastArticles = lastArticles,
                    NumberOfArticles = numberOfArticles});

                return Ok(articles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("GetDetails")]
        public async Task<IActionResult> GetBreakDownDetailsAsync([FromQuery] string languageId)
        {
            try
            {
                var result = await _breakDownService.GetBreakDownsDetailsAsync(languageId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}