using SportHub.Data.Entities;

namespace SportHub.Business
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();

        Task<Category> GetCategoryByIdAsync(string CategoryId);

        Task<string> CreateCategoryAsync(Category category);

        Task DeleteCategoryAsync(string CategoryId);

        Task UpdateCategoryAsync(string CategoryId, string CategoryName);
    }
}