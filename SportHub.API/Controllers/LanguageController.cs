using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.Entities;
using SportHub.Data.DTO;
using SportHub.Business.Interfaces;
using SportHub.Controllers;
using SportHub.Business.Services;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageService _languageService;
        private readonly ILogger<LanguageController> _logger;

        public LanguageController(ILanguageService languageService, ILogger<LanguageController> logger)
        {
            _languageService = languageService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetLanguagesAsync()
        {
            try
            {
                var response = await _languageService.GetLanguagesAsync();

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{shortTitle}")]
        public async Task<IActionResult> GetLanguageByTitleAsync([FromRoute] string shortTitle)
        {
            try
            {
                var response = await _languageService.GetLanguageByTitleAsync(shortTitle);

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddLanguageAsync([FromBody] LanguageRequest language)
        {
            try
            {
                await _languageService.AddLanguageAsync(language);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{shortTitle}/{isActive}")]
        public async Task<IActionResult> ChangeLanguageIsActiveAsync([FromRoute] string shortTitle, [FromRoute] bool isActive)
        {
            if (shortTitle == "en")
                return BadRequest();
            try
            {
                await _languageService.ChangeLanguageIsActiveAsync(shortTitle, isActive);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{shortTitle}")]
        public async Task<IActionResult> DeleteLanguageAsync([FromRoute] string shortTitle)
        {
            if (shortTitle == "en")
                return BadRequest();
            try
            {
                await _languageService.DeleteLanguageAsync(shortTitle);    
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
