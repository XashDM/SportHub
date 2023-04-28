using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface ICategoryRepository
	{
		Task<IEnumerable<Category>> GetAllCategoriesAsync();
	}
}