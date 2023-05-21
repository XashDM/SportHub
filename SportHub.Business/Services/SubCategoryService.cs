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

        public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryIdAsync(string categoryId){
			var subCategories = await _subCategoryRepository.GetAllSubCategoriesByCategoryIdAsync(categoryId);

			return subCategories;
		}

        public async Task<SubCategory> GetSubCategoriesByIdAsync(string subCategoryId)
        {
            var subCategory = await _subCategoryRepository.GetSubCategoriesByIdAsync(subCategoryId);

            return subCategory;
        }

        public async Task<string> CreateSubCategoryAsync(SubCategory subCategory){
			
			return await _subCategoryRepository.CreateSubCategoryAsync(subCategory);
        }

        public async Task DeleteSubCategoryAsync(string SubCategoryId) {
			await _subCategoryRepository.DeleteSubCategoryAsync(SubCategoryId);
		}

        public async Task UpdateSubcategoryAsync(string SubCategoryId, string SubCategoryName)
        {
			await _subCategoryRepository.UpdateSubcategoryAsync(SubCategoryId,SubCategoryName);
		}

        public async Task UpdateCategoryOfSubCategoryAsync(string SubCategoryId, string CategoryId)
		{
			await _subCategoryRepository.UpdateCategoryOfSubCategoryAsync(SubCategoryId,CategoryId);
		}
    }
}