using Microsoft.AspNetCore.Mvc;
using SportHub.Business;

namespace SportHub.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService _categoryService;
		private readonly ILogger<CategoryController> _logger;

		public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
		{
			_categoryService = categoryService;
			_logger = logger;
		}

		[HttpGet("all")]
		public async Task<IActionResult> GetAllCategoriesAsync()
		{
			var categories = await _categoryService.GetAllCategoriesAsync();

			return Ok(categories);
		}
	}
}