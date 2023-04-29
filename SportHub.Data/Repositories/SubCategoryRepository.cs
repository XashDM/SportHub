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
}