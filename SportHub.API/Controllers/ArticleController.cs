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
	public class ArticleController : ControllerBase
	{
		private readonly IArticleService _articlesService;
		private readonly ILogger<ArticleController> _logger;
		private readonly IMapper _mapper;

		public ArticleController(IArticleService articlesService, ILogger<ArticleController> logger,
			IMapper mapper)
		{
			_articlesService = articlesService;
			_logger = logger;
			_mapper = mapper;
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
		
		[HttpGet(Name = "GetArticleByIdAndLanguage")]
		public async Task<IActionResult> GetArticleByIdAndLanguageAsync([FromQuery] string id, string language)
		{
			try
			{
				var article = await _articlesService.GetArticleByIdAndLanguageAsync(id, language);

				return Ok(article);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
		
		[HttpGet("~/GetArticleByArticleIdAndLanguageId")]
		public async Task<IActionResult> GetArticleByArticleIdAndLanguageIdAsync([FromQuery] string articleId, string languageId)
		{
			try
			{
				var article = await _articlesService.GetArticleByIdAndLanguageAsync(articleId, languageId);

				return Ok(article);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
		
		[HttpGet("MainArticles")]
		public async Task<IActionResult> GetMainArticlesAsync([FromQuery] string language)
		{
			try
			{
				var mainArticles = await _articlesService.GetMainArticlesAsync(language);
				
				return Ok(mainArticles);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("~/GetArticleByLanguageIdAndCategoryId")]
		public async Task<IActionResult> GetArticlesForAutocompleteByLanguageIdAndCategoryIdAsync([FromQuery] string languageId, string categoryId)
		{
			try
			{
				var articlesForAutocomplete = await _articlesService.GetArticleForAutocompleteByLanguageIdAndPropertyIdAsync(languageId, "CategoryId", categoryId);
				
				return Ok(articlesForAutocomplete);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
		
		[HttpGet("~/GetArticleByLanguageIdAndSubCategoryId")]
		public async Task<IActionResult> GetArticlesForAutocompleteByLanguageIdAndSubCategoryIdAsync([FromQuery] string languageId, string subCategoryId)
		{
			try
			{
				var articlesForAutocomplete = await _articlesService.GetArticleForAutocompleteByLanguageIdAndPropertyIdAsync(languageId, "SubCategoryId", subCategoryId);
				
				return Ok(articlesForAutocomplete);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
		
		[HttpGet("~/GetArticleByLanguageIdAndTeamId")]
		public async Task<IActionResult> GetArticlesForAutocompleteByLanguageIdAndTeamId([FromQuery] string languageId, string teamId)
		{
			try
			{
				var articlesForAutocomplete = await _articlesService.GetArticleForAutocompleteByLanguageIdAndPropertyIdAsync(languageId, "TeamId", teamId);
				
				return Ok(articlesForAutocomplete);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
	}
}