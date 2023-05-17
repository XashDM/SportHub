using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface ISubCategoryRepository
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

		Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(string categoryId);

		Task<SubCategory> GetSubCategoriesById(string SubCategoryId);

        Task<string> CreateSubCategory(SubCategory subCategory);

		Task DeleteSubCategoryAsync(string SubCategoryId);

		Task UpdateSubcategory(string subCategoryId, string SubCategoryName);

    }
}