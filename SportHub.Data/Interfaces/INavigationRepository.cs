using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface INavigationRepository
	{
		Task<Category> GetCategoryBySubCategoryId(string id);
	}
}