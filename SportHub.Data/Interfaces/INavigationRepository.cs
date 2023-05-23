using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface INavigationRepository
	{
		Task<ImageClass> GetImageById(string id);
		
		Task<Category> GetCategoryBySubCategoryId(string id);
	}
}