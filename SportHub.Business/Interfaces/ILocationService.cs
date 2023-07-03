using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ILocationService
	{
		Task<Location> GetLocationByIdAsync(string id);
		Task<IEnumerable<Location>> GetLocationsAsync();
	}
}