﻿using AutoMapper;
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
		
		[HttpGet(Name = "GetArticle")]
		public async Task<IActionResult> GetArticleAsync([FromQuery] string id)
		{
			try
			{
				var article = await _articlesService.GetArticleAsync(id);

				if (article == null)
				{
					return NotFound($"Article with id {id} doesn't exists");
				}
				var articleResponse = _mapper.Map<FullArticle, ArticleResponse>(article);
				
				articleResponse.Author = _mapper.Map<User, UserResponseDto>(article.Author);
				
				return Ok(articleResponse);
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