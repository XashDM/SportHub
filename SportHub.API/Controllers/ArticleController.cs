using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using System.Text.Json;

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

		[HttpPost(Name = "PostArticle")]
		public async Task<IActionResult> PostArticleTestAsync([FromBody] JsonElement json)
		{
			try
			{
				var article = JsonSerializer.Deserialize<Article>(json.GetProperty("Article"));
				var articleInfos = JsonSerializer.Deserialize<ArticleInfo[]>(json.GetProperty("ArticleInfos"));

				await _articlesService.PostArticleAsync(article, articleInfos);
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