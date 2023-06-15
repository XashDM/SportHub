using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository ;

        public LocationService(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<Location> GetLocationByIdAsync(string id)
        {
            var location = await _locationRepository.GetLocationByIdAsync(id);
            
            return location;
        }
    }
}
