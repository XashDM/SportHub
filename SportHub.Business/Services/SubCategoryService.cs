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

        public async Task<string> CreateSubCategory(SubCategory subCategory){
			var NewSubCategoryId = Guid.NewGuid().ToString();
			subCategory.SubCategoryId = NewSubCategoryId;

			return await _subCategoryRepository.CreateSubCategory(subCategory);
        }

        public async Task DeleteSubCategoryAsync(string SubCategoryId) {
			await _subCategoryRepository.DeleteSubCategoryAsync(SubCategoryId);
		}

        public async Task UpdateSubcategory(SubCategory subCategory)
		{
			await _subCategoryRepository.UpdateSubcategory(subCategory);
		}
    }
}