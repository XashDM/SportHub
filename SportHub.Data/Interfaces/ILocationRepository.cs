using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface ILocationRepository
	{
		Task<IEnumerable<Location>> GetLocationsAsync();
	}
}
