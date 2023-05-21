using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();

        Task<Category> GetCategoryByIdAsync(string CategoryId);

        Task<string> CreateCategoryAsync(Category category);

        Task DeleteCategoryAsync(string CategoryId);

        Task UpdateCategoryAsync(string CategoryId, string CategoryName);
    }
}