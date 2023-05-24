using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces
{
	public interface INavigationService
	{
		Task<Category> GetCategoryBySubCategoryId(string id);
	}
}