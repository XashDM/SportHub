using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class ImageRepository : IImageRepository
{
	private readonly IDbConnectionFactory _dbConnectionFactory;

	public ImageRepository(IDbConnectionFactory dbConnectionFactory)
	{
		_dbConnectionFactory = dbConnectionFactory;
	}
	
	public async Task<Image> GetImageById(string id)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			
			var imageQuery = @"SELECT * FROM Images WHERE ImageId = @id;";
			
			var image = await connection.QueryFirstOrDefaultAsync<Image>(imageQuery, new { id });
			
			return image;
		}
	}

	public async Task CreateImageAsync(Image image)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();

			var sqlImage = "INSERT INTO Images (ImageId, Url, Alt) VALUES (@ImageId, @Url, @Alt)";

			await connection.ExecuteAsync(sqlImage, image);
		}
	}
}