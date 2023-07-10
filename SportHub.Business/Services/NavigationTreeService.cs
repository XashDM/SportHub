using SportHub.Data.Entities;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;

namespace SportHub.Business.Implementations
{
    public class NavigationTreeService : INavigationTreeService
    {
        private readonly INavigationTreeRepository _NavigationTreeRepository;

        public NavigationTreeService(INavigationTreeRepository NavigationTreeService)
        {
            _NavigationTreeRepository = NavigationTreeService;
        }

        public async Task CreateByNavigationTree(NavigationTree navigationTree)
        {
           await _NavigationTreeRepository.CreateByNavigationTree(navigationTree);
        }

    }
}