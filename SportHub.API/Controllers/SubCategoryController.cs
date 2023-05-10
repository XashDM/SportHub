using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.Entities;

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
        public async Task<IActionResult> GetSubCategoriesByCategoryAsync([FromRoute] int id)
        {
			var subCategories = await _subCategoryService.GetAllSubCategoriesByCategoryId(id);

            return Ok(subCategories);
        }

		[HttpPost]
		public async Task<IActionResult> CreateNewSubCategory([FromBody] SubCategory subCategory)
		{
			try
			{
				var NewSubCategoryId = await _subCategoryService.CreateSubCategory(subCategory);
                return Ok(NewSubCategoryId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
		}

		[HttpDelete("{SubCategoryId}")]
		public async Task<IActionResult> DeleteSubCategoryAsync([FromRoute]string SubCategoryId)
		{
			try
			{
				await _subCategoryService.DeleteSubCategoryAsync(SubCategoryId);
				return Ok();
			}
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
		[HttpPut]
        public async Task<IActionResult> UpdateSubcategory([FromBody]SubCategory subCategory)
		{
			try
			{
				await _subCategoryService.UpdateSubcategory(subCategory);
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