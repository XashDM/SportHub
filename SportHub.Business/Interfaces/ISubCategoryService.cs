using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ISubCategoryService
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

        Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(int categoryId);

        Task<string> CreateSubCategory(SubCategory subCategory);

        Task DeleteSubCategoryAsync(string SubCategoryId);

        Task UpdateSubcategory(SubCategory subCategory);
    }
}