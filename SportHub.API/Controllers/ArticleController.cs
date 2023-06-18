using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SportHub.API.Infrastructure.Interfaces;
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
		private readonly IImageStorageService _imageStorageService;
		private readonly ILogger<ArticleController> _logger;
		private readonly IMapper _mapper;

		public ArticleController(IArticleService articlesService, ILogger<ArticleController> logger,
			IMapper mapper, IImageStorageService imageStorageService)
		{
			_articlesService = articlesService;
			_logger = logger;
			_mapper = mapper;
			_imageStorageService = imageStorageService;
		}

		[HttpPost(Name = "Article")]
		public async Task<IActionResult> CreateArticleAsync()
		{
			try
			{
				var file = Request.Form.Files["file"];
				var articleJson = Request.Form["article"];
				var imageJson = Request.Form["image"];

				if (file == null || string.IsNullOrEmpty(articleJson) || string.IsNullOrEmpty(imageJson))
				{
					return BadRequest("Missing input data.");
				}

				var articleCreateDto = JsonConvert.DeserializeObject<ArticleCreateDto>(articleJson);
				var article = _mapper.Map<ArticleCreateDto, Article>(articleCreateDto);

				var imageCreateDto = JsonConvert.DeserializeObject<ImageCreateDto>(imageJson);
				var image = _mapper.Map<ImageCreateDto, Image>(imageCreateDto);

				var fileName = await _imageStorageService.SaveImageFile(file);
				await _articlesService.CreateArticleAsync(article, image, fileName);

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
		
		[HttpGet("GetPageOfArticlesByCategory")]
		public async Task<IActionResult> GetPageOfArticlesByCategoryAsync([FromQuery] string language, [FromQuery] string categoryId, [FromQuery] int pageNumber)
		{
			try
			{
				var pageOfArticles = await _articlesService.GetPageOfArticlesByCategoryAsync(language, categoryId, pageNumber);
				
				return Ok(pageOfArticles);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
	}
}