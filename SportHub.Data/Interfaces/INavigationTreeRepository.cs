using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface INavigationTreeRepository
    {
        public Task CreateByNavigationTree(NavigationTree navigationTree);
    }
}