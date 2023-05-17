using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ISubCategoryService
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

        Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(string categoryId);

        Task<SubCategory> GetSubCategoriesById(string subCategoryId);

        Task<string> CreateSubCategory(SubCategory subCategory);

        Task DeleteSubCategoryAsync(string SubCategoryId);

        Task UpdateSubcategory(string SubCategoryId, string SubCategoryName);
    }
}