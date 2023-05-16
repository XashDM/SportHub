using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class SubCategoryRepository : ISubCategoryRepository
{
	private readonly IDbConnectionFactory _dbConnectionFactory;

	public SubCategoryRepository(IDbConnectionFactory dbConnectionFactory)
	{
		_dbConnectionFactory = dbConnectionFactory;
	}

	public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync()
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var sql = "SELECT * FROM subcategories";
			var subCategories = await connection.QueryAsync<SubCategory>(sql);

			return subCategories;
		}
	}

	public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryId(int categoryId) {
		using(var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var sql = $"SELECT * FROM subcategories WHERE CategoryId={categoryId}";
			var subCategories = await connection.QueryAsync<SubCategory>(sql);

			return subCategories;
        }
	}

    public async Task<SubCategory> GetSubCategoriesById(int SubCategoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM subcategories WHERE SubCategoryId={SubCategoryId}";
            var subCategory = await connection.QueryFirstAsync<SubCategory>(sql);

            return subCategory;
        }
    }

    public async Task<string> CreateSubCategory (SubCategory subCategory)
    {
        using(var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = "INSERT INTO subcategories (SubCategoryId,SubCategoryName,CategoryId) " +
                      "VALUES (@SubCategoryId, @SubCategoryName, @CategoryId);";
            await connection.ExecuteAsync(sql, subCategory);
        }

        return subCategory.SubCategoryId;
    }

    public async Task DeleteSubCategoryAsync(string SubCategoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"DELETE FROM subcategories WHERE SubCategoryId='{SubCategoryId}';";
            await connection.ExecuteAsync(sql);
        }
    }

    public async Task UpdateSubcategory(SubCategory subCategory)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"UPDATE subcategories SET SubCategoryName = '{subCategory.SubCategoryName}'" +
                       $"WHERE SubCategoryId = '{subCategory.SubCategoryId}';";
            await connection.ExecuteAsync(sql);

        }
    }
}