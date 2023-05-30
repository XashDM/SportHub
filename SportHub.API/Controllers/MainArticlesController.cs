using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business.Interfaces;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers;

[Route("[controller]")]
[ApiController]
public class MainArticlesController : ControllerBase
{
    private readonly IMainArticlesServices _mainArticlesServices;
    private readonly ILogger<MainArticlesController> _logger;
    private readonly IMapper _mapper;
    
    public MainArticlesController(IMainArticlesServices languageService, ILogger<MainArticlesController> logger, IMapper mapper)
    {
        _mainArticlesServices = languageService;
        _logger = logger;
        _mapper = mapper;
    }

    [HttpGet("{languageId}")]
    public async Task<IActionResult> GetMainArticlesByLanguageIdAsync([FromRoute] string languageId)
    {
        try
        {
            IEnumerable<MainArticle> response = await _mainArticlesServices.GetMainArticlesByLanguageIdAsync(languageId);
            return Ok(response);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception.Message);
            return BadRequest(exception.Message);
        }
    }
    
    [HttpGet("~/MainArticlesFullInfo/{languageId}")]
    public async Task<IActionResult> GetMainArticlesWithAdditionalInformationAsync([FromRoute] string languageId)
    {
        try
        {
            IEnumerable<ArticleForMainArticleForm> response = await _mainArticlesServices.GetMainArticlesWithAdditionalInformationByLanguageIdAsync(languageId);
            return Ok(response);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception.Message);
            return BadRequest(exception.Message);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> AddMainArticlesAsync([FromBody] IEnumerable<MainArticleRequest> mainArticlesRequests)
    {
        try
        {
            var mainArticles = _mapper.Map<IEnumerable<MainArticle>>(mainArticlesRequests);
            await _mainArticlesServices.CreateMainArticlesAsync(mainArticles);
            return Ok();
        }
        catch (Exception exception)
        {
            _logger.LogError(exception.Message);
            return BadRequest(exception.Message);
        }
    }
}