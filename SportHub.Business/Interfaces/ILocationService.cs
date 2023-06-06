using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ILocationService
	{
		Task<IEnumerable<Location>> GetLocationsAsync();
	}
}