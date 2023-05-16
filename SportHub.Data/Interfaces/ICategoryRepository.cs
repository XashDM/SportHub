using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();

        Task<Category> GetCategoryById(string CategoryId);

        Task<string> CreateCategory(Category category);

        Task DeleteCategoryAsync(string CategoryId);

        Task UpdateCategory(string CategoryId, string CategoryName);
    }
}