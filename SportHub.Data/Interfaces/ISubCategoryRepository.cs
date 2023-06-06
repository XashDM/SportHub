using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface ISubCategoryRepository
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

		Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryIdAsync(string categoryId);

		Task<SubCategory> GetSubCategoriesByIdAsync(string SubCategoryId);

        Task<string> CreateSubCategoryAsync(SubCategory subCategory);

		Task DeleteSubCategoryAsync(string SubCategoryId);

		Task UpdateSubcategoryAsync(string subCategoryId, string SubCategoryName);

		Task UpdateCategoryOfSubCategoryAsync(string SubCategoryId, string CategoryId);

    }
}