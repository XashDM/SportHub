using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
		public async Task<IActionResult> CreateArticleAsync()
		{
			try
			{
				var file = Request.Form.Files["file"];

				var articleCreateDto = JsonConvert.DeserializeObject<ArticleCreateDto>(Request.Form["article"]);
				var article = _mapper.Map<ArticleCreateDto, Article>(articleCreateDto);

				var imageCreateDto = JsonConvert.DeserializeObject<ImageCreateDto>(Request.Form["image"]);
				var image = _mapper.Map<ImageCreateDto, Image>(imageCreateDto);

				await _articlesService.CreateArticleAsync(article, image, file);

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
	}
}