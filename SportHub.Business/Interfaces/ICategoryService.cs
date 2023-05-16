using SportHub.Data.Entities;

namespace SportHub.Business
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();

        Task<Category> GetCategoryById(string CategoryId);

        Task<string> CreateCategory(Category category);

        Task DeleteCategoryAsync(string CategoryId);

        Task UpdateCategory(string CategoryId, string CategoryName);
    }
}