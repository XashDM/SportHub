using SportHub.Data.Entities;

namespace SportHub.Business
{
    public interface INavigationTreeService
    {
        public Task AppendNavigationTree(NavigationTree navigationTree);

    }
}