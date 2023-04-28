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
			var categories = await connection.QueryAsync<Category>(sql);

			return categories;
		}
	}
}