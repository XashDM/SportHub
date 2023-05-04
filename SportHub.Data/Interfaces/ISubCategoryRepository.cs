using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface ISubCategoryRepository
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

		Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(int categoryId);
	}
}