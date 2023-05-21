using SportHub.Data.Entities;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;

namespace SportHub.Business.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _CategoryRepository;

        public CategoryService(ICategoryRepository CategoryService)
        {
            _CategoryRepository = CategoryService;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            var Categories = await _CategoryRepository.GetAllCategoriesAsync();

            return Categories;
        }

        public async Task<Category> GetCategoryByIdAsync(string CategoryId)
        {
            var category = await _CategoryRepository.GetCategoryByIdAsync(CategoryId);

            return category;
        }

        public async Task<string> CreateCategoryAsync(Category category)
        {
            return await _CategoryRepository.CreateCategoryAsync(category);
        }

        public async Task DeleteCategoryAsync(string CategoryId)
        {
            await _CategoryRepository.DeleteCategoryAsync(CategoryId);
        }

        public async Task UpdateCategoryAsync(string CategoryId, string CategoryName)
        {
            await _CategoryRepository.UpdateCategoryAsync(CategoryId, CategoryName);
        }

    }
}