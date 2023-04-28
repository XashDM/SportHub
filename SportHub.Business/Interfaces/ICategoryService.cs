using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ICategoryService
	{
		Task<IEnumerable<Category>> GetAllCategoriesAsync();
	}
}