using SportHub.Data.Entities;

namespace SportHub.Business
{
    public interface INavigationTreeService
    {
        public Task CreateByNavigationTree(NavigationTree navigationTree);

    }
}