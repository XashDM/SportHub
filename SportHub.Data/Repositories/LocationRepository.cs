using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Factories;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class LocationRepository : ILocationRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public LocationRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<Location> GetLocationByIdAsync(string id)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM Locations WHERE LocationId='{id}'";
            var location = await connection.QueryFirstOrDefaultAsync<Location>(sql);

            return location;
        }
    }

	public async Task<IEnumerable<Location>> GetLocationsAsync()
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var sql = $"SELECT * FROM locations;";
			var response = await connection.QueryAsync<Location>(sql);

			return response;
		}
	}
}