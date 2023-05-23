using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces
{
	public interface INavigationService
	{
		Task<ImageClass> GetImageById(string id);
		
		Task<Category> GetCategoryBySubCategoryId(string id);
	}
}