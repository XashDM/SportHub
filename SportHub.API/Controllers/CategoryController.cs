using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _CategoryService;
        private readonly ILogger<CategoryController> _logger;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService CategoryService, ILogger<CategoryController> logger,IMapper mapper)
        {
            _CategoryService = CategoryService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCategoriesAsync()
        {
            var Categories = await _CategoryService.GetAllCategoriesAsync();

            return Ok(Categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryByIdAsync([FromRoute] string id)
        {
            try
            {
                var category = await _CategoryService.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    return NotFound("Category does not exist");
                }

                return Ok(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategoryAsync([FromBody] CategoryCreateDto categoryDto)
        {
            try
            {
                Category category = _mapper.Map<CategoryCreateDto, Category>(categoryDto);

                var NewCategoryId = await _CategoryService.CreateCategoryAsync(category);
                return Ok(NewCategoryId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{CategoryId}")]
        public async Task<IActionResult> DeleteCategoryAsync([FromRoute] string CategoryId)
        {
            try
            {
                var category = await _CategoryService.GetCategoryByIdAsync(CategoryId);

                if (category == null)
                {
                    return NotFound("Category does not exist");
                }

                await _CategoryService.DeleteCategoryAsync(CategoryId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{CategoryId}")]
        public async Task<IActionResult> UpdateCategoryAsync([FromRoute] string CategoryId, [FromBody] string CategoryName)
        {
            try
            {
                var category = await _CategoryService.GetCategoryByIdAsync(CategoryId);

                if (category == null)
                {
                    return NotFound("Category does not exist");
                }

                await _CategoryService.UpdateCategoryAsync(CategoryId, CategoryName);
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