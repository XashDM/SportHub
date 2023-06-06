using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;
using System.Collections.Generic;

namespace SportHub.Business.Implementations
{
	public class LocationService : ILocationService
	{
		private readonly ILocationRepository _locationRepository;

		public LocationService(ILocationRepository locationRepository)
		{
			_locationRepository = locationRepository;
		}

		public async Task<IEnumerable<Location>> GetLocationsAsync()
		{
			return await _locationRepository.GetLocationsAsync();
		}
	}
}