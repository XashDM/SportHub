using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface ILocationRepository
    {
        Task<Location> GetLocationByIdAsync(string id);
	Task<IEnumerable<Location>> GetLocationsAsync();
    }
}
