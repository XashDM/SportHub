using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
    public interface INavigationTreeService
    {
        public Task AppendNavigationTree(NavigationTree navigationTree);
        public Task DeleteFromNavigationTree(NavigationTreeDeleteDTO navigationTree);

        public Task HideNavigationTree(NavigationTreeHideDTO navigationTree);

    }
}