using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class NavigationRepository : INavigationRepository
{
	private readonly IDbConnectionFactory _dbConnectionFactory;

	public NavigationRepository(IDbConnectionFactory dbConnectionFactory)
	{
		_dbConnectionFactory = dbConnectionFactory;
	}
	
	public async Task<ImageClass> GetImageById(string id)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			
			var imageQuery = @"SELECT * FROM Images WHERE ImageId = @id;";
			
			var image = await connection.QueryFirstOrDefaultAsync<ImageClass>(imageQuery, new { id });
			
			return image;
		}
	}
	
	public async Task<Category> GetCategoryBySubCategoryId(string id)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			
			var categoryQuery = @"SELECT * FROM SubCategories
								LEFT JOIN Categories ON Categories.CategoryId = SubCategories.CategoryId 
								WHERE SubCategories.SubCategoryId = @id;";
			
			var category = await connection.QueryFirstOrDefaultAsync<Category>(categoryQuery, new { id });
			
			return category;
		}
	}
}