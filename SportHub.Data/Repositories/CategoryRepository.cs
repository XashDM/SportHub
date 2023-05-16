using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public CategoryRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = "SELECT * FROM categories";
            var Categories = await connection.QueryAsync<Category>(sql);

            return Categories;
        }
    }

    public async Task<Category> GetCategoryById(string CategoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM categories WHERE CategoryId={CategoryId}";
            var category = await connection.QueryFirstAsync<Category>(sql);

            return category;
        }
    }

    public async Task<string> CreateCategory(Category category)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = "INSERT INTO categories (CategoryId,CategoryName) " +
                      "VALUES (@CategoryId, @CategoryName);";
            await connection.ExecuteAsync(sql, category);
        }

        return category.CategoryId;
    }

    public async Task DeleteCategoryAsync(string CategoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"DELETE FROM categories WHERE CategoryId='{CategoryId}';";
            await connection.ExecuteAsync(sql);
        }
    }

    public async Task UpdateCategory(string CategoryId,string CategoryName)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"UPDATE categories SET CategoryName = '{CategoryName}'" +
                       $"WHERE CategoryId = '{CategoryId}';";
            await connection.ExecuteAsync(sql);

        }
    }
}