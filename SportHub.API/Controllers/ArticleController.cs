﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

		[HttpPost]
		[Authorize(Policy = "AdminPolicy")]
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

				var imageUrl = await _imageStorageService.SaveImageFile(file);
				await _articlesService.CreateArticleAsync(article, image, imageUrl);

				return Ok();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Authorize(Policy = "AdminPolicy")]
		public async Task<IActionResult> UpdateArticleAsync()
		{
			try
			{
				var file = Request.Form.Files["file"];
				var articleJson = Request.Form["article"];
				var imageJson = Request.Form["image"];

				if (string.IsNullOrEmpty(articleJson) || string.IsNullOrEmpty(imageJson))
				{
					return BadRequest("Missing input data.");
				}

				var article = JsonConvert.DeserializeObject<Article>(articleJson);

				var image = JsonConvert.DeserializeObject<Image>(imageJson);

				var imageUrl = image.Url;

				if(file != null)
					imageUrl = await _imageStorageService.SaveImageFile(file);

				await _articlesService.UpdateArticleAsync(article, image, imageUrl);

				return Ok();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
		
		[HttpGet("{id}")]
		[AllowAnonymous]
		public async Task<IActionResult> GetArticleByIdAsync([FromRoute] string id)
		{
			try
			{
				var articleWithImage = await _articlesService.GetArticleByIdAsync(id);
				var result = new { article = articleWithImage.Item1, image = articleWithImage.Item2 };

				return Ok(result);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[HttpGet(Name = "GetArticleByIdAndLanguage")]
		[AllowAnonymous]
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
		
				
		[HttpGet( "~/AllArticlesByFilters")]
		[AllowAnonymous]
		public async Task<IActionResult> GetArticlesByFiltersAsync([FromQuery] string languageId, string articleId = null, string authorId = null,
			string categoryId = null, string subcategoryId = null, string teamId = null, string locationId = null, bool? published = null,
			bool? showComments = null, bool? lastArticles = null, int? numberOfArticles = null)
		{
			try
			{
				var articles = await _articlesService.GetAllArticlesByFiltersAsync(languageId, 
					new ArticleSearchOptions
					{
						ArticleId = articleId,
						AuthorId = authorId,
						CategoryId = categoryId,
						SubCategoryId = subcategoryId,
						TeamId = teamId,
						LocationId = locationId,
						Published = published,
						ShowComments = showComments,
						LastArticles = lastArticles,
						NumberOfArticles = numberOfArticles
					});
				return Ok(articles);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				return BadRequest(ex.Message);
			}
		}
		
		[HttpGet("ArticleByIdAndLanguageId")]
		[AllowAnonymous]
		public async Task<IActionResult> GetArticleByIdAndLanguageIdAsync([FromQuery] string articleId, string languageId)
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
		[AllowAnonymous]
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
		
		[HttpPost("MainArticle")]
		[Authorize(Policy = "AdminPolicy")]
		public async Task<IActionResult> AddMainArticlesAsync([FromBody] IEnumerable<MainArticleRequest> mainArticlesRequests)
		{
			try
			{
				var mainArticles = _mapper.Map<IEnumerable<MainArticle>>(mainArticlesRequests);
				await _articlesService.CreateMainArticlesAsync(mainArticles);
				return Ok();
			}
			catch (Exception exception)
			{
				_logger.LogError(exception.Message);
				return BadRequest(exception.Message);
			}
		}
		
		[HttpGet("MainArticleByLanguageId")]
		[AllowAnonymous]
		public async Task<IActionResult> GetMainArticlesByLanguageIdAsync([FromQuery] string languageId)
            {
                try
                {
                    IEnumerable<MainArticle> response = await _articlesService.GetMainArticlesByLanguageIdAsync(languageId);
                    return Ok(response);
                }
                catch (Exception exception)
                {
                    _logger.LogError(exception.Message);
                    return BadRequest(exception.Message);
                }
            }
            
        [HttpGet("MainArticlesDetails")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMainArticlesDetailsByLanguageIdAsync([FromQuery] string languageId)
        {
            try
            {
                IEnumerable<FullLanguageSpecificArticle> response = await _articlesService.GetMainArticlesDetailsByLanguageIdAsync(languageId);
                return Ok(response);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception.Message);
                return BadRequest(exception.Message);
            }
        }
        
		
		[HttpGet("GetPageOfArticlesByCategory")]
		[AllowAnonymous]
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

        [HttpGet("GetPageOfSearchArticles")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPageOfSearchArticlesAsync([FromQuery] string language, [FromQuery] string findText, [FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            try
            {
                var pageOfArticles = await _articlesService.GetPageOfSearchArticlesAsync(language, findText, pageNumber, pageSize);

                return Ok(pageOfArticles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetNumberOfSearchArticles")]
        public async Task<IActionResult> GetNumberOfSearchArticlesAsync([FromQuery] string language, [FromQuery] string findText)
        {
            try
            {
                var response = await _articlesService.GetNumberOfSearchArticlesAsync(language, findText);
                var numberOfArticles = _mapper.Map<SearchArticlesCount, SearchArticlesCountDto>(response);

                return Ok(numberOfArticles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}