using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ISubCategoryService
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

        Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryIdAsync(string categoryId);

        Task<SubCategory> GetSubCategoriesByIdAsync(string subCategoryId);

        Task<string> CreateSubCategoryAsync(SubCategory subCategory);

        Task DeleteSubCategoryAsync(string SubCategoryId);

        Task UpdateSubcategoryAsync(string SubCategoryId, string SubCategoryName);

        Task UpdateCategoryOfSubCategoryAsync(string SubCategoryId, string CategoryId);
    }
}