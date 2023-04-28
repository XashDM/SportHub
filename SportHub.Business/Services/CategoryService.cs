using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
	public class CategoryService: ICategoryService
	{
		private readonly ICategoryRepository _categoryRepository;

		public CategoryService(ICategoryRepository categoryService)
		{
			_categoryRepository = categoryService;
		}

		public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
		{
			var categories = await _categoryRepository.GetAllCategoriesAsync();

			return categories;
		}
	}
}