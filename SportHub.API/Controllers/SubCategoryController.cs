using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class SubCategoryController : ControllerBase
	{
		private readonly ISubCategoryService _subCategoryService;
		private readonly ILogger<SubCategoryController> _logger;
        private readonly IMapper _mapper;

        public SubCategoryController(ISubCategoryService subCategoryService, ILogger<SubCategoryController> logger,IMapper mapper)
		{
			_subCategoryService = subCategoryService;
			_logger = logger;
			_mapper = mapper;
		}

		[HttpGet("all")]
		[AllowAnonymous]
		public async Task<IActionResult> GetAllSubCategoriesAsync()
		{
			var subCategories = await _subCategoryService.GetAllSubCategoriesAsync();

			return Ok(subCategories);
		}

        [HttpGet("category/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSubCategoriesByCategoryAsync([FromRoute] string id)
        {
			try
			{
                var subCategories = await _subCategoryService.GetAllSubCategoriesByCategoryIdAsync(id.ToString());

                return Ok(subCategories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{SubCategoryId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSubCategoriesByIdAsync([FromRoute] string SubCategoryId)
		{
			try
			{
				var subCategory = await _subCategoryService.GetSubCategoriesByIdAsync(SubCategoryId);

                if (subCategory == null)
                {
                    return NotFound("SubCategory does not exist");
                }

                return Ok(subCategory);

			}
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize("AdminPolicy")]
		public async Task<IActionResult> CreateNewSubCategory([FromBody] SubCategoryCreateDto subCategoryDto)
		{	
			
            try
			{
                SubCategory subCategory = _mapper.Map<SubCategoryCreateDto, SubCategory>(subCategoryDto);

                var NewSubCategoryId = await _subCategoryService.CreateSubCategoryAsync(subCategory);
                return Ok(NewSubCategoryId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
		}

		[HttpDelete("{SubCategoryId}")]
		[Authorize("AdminPolicy")]
		public async Task<IActionResult> DeleteSubCategoryAsync([FromRoute]string SubCategoryId)
		{
			try
			{
                var subCategory = await _subCategoryService.GetSubCategoriesByIdAsync(SubCategoryId);

                if (subCategory == null)
                {
                    return NotFound("SubCategory does not exist");
                }

                await _subCategoryService.DeleteSubCategoryAsync(SubCategoryId);
				return Ok();
			}
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

		[HttpPut("{SubCategoryId}")]
		[Authorize("AdminPolicy")]
        public async Task<IActionResult> UpdateSubcategory([FromRoute] string SubCategoryId,[FromBody] string SubCategoryName)
		{
			try
			{
                var subCategory = await _subCategoryService.GetSubCategoriesByIdAsync(SubCategoryId);

                if (subCategory == null)
                {
                    return NotFound("SubCategory does not exist");
                }

                await _subCategoryService.UpdateSubcategoryAsync(SubCategoryId, SubCategoryName);
				return Ok();
			}
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{SubCategoryId}/category")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> UpdateCategoryOfSubCategoryAsync([FromRoute] string SubCategoryId, [FromBody] string CategoryId)
        {
            try
            {
                var subCategory = await _subCategoryService.GetSubCategoriesByIdAsync(SubCategoryId);

                if (subCategory == null)
                {
                    return NotFound("SubCategory does not exist");
                }

                await _subCategoryService.UpdateCategoryOfSubCategoryAsync(SubCategoryId, CategoryId);
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