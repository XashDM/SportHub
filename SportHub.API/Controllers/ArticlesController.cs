using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business.Interfaces;
using webapi;
using webapi.Controllers;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticlesService _articlesService;
        private readonly ILogger<WeatherForecastController> _logger;

        public ArticlesController(IArticlesService articlesService, ILogger<WeatherForecastController> logger)
        {
            _articlesService = articlesService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticlesAsync()
        {
            try
            {
                var articles = await _articlesService.GetArticles();

                // map to response and send back

                return Ok(articles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
