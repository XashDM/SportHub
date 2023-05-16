using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface ISubCategoryRepository
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

		Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(int categoryId);

		Task<SubCategory> GetSubCategoriesById(int SubCategoryId);

        Task<string> CreateSubCategory(SubCategory subCategory);

		Task DeleteSubCategoryAsync(string SubCategoryId);

		Task UpdateSubcategory(SubCategory subCategory);

    }
}