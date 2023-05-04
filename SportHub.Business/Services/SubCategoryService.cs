using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
	public class SubCategoryService: ISubCategoryService
	{
		private readonly ISubCategoryRepository _subCategoryRepository;

		public SubCategoryService(ISubCategoryRepository subCategoryService)
		{
			_subCategoryRepository = subCategoryService;
		}

		public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync()
		{
			var subCategories = await _subCategoryRepository.GetAllSubCategoriesAsync();

			return subCategories;
		}

        public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(int categoryId){
			var subCategories = await _subCategoryRepository.GetAllSubCategoriesByCategoryId(categoryId);

			return subCategories;
		}
    }
}