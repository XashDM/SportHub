using Microsoft.AspNetCore.Mvc;
using SportHub.Business;

namespace SportHub.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class SubCategoryController : ControllerBase
	{
		private readonly ISubCategoryService _subCategoryService;
		private readonly ILogger<SubCategoryController> _logger;

		public SubCategoryController(ISubCategoryService subCategoryService, ILogger<SubCategoryController> logger)
		{
			_subCategoryService = subCategoryService;
			_logger = logger;
		}

		[HttpGet("all")]
		public async Task<IActionResult> GetAllSubCategoriesAsync()
		{
			var subCategories = await _subCategoryService.GetAllSubCategoriesAsync();

			return Ok(subCategories);
		}

        [HttpGet("category/{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
			var subCategories = await _subCategoryService.GetAllSubCategoriesByCategoryId(id);

            return Ok(subCategories);
        }
    }
}