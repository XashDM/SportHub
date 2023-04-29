using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ArticleController : ControllerBase
	{
		private readonly IArticleService _articlesService;
		private readonly ILogger<ArticleController> _logger;

		public ArticleController(IArticleService articlesService, ILogger<ArticleController> logger)
		{
			_articlesService = articlesService;
			_logger = logger;
		}

		[HttpPost(Name = "Article")]
		public async Task<IActionResult> CreateArticleAsync([FromBody] Article article)
		{
			try
			{
				await _articlesService.CreateArticleAsync(article);
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