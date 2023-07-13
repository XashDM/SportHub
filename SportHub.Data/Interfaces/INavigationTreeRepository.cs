using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface INavigationTreeRepository
    {
        public Task AppendNavigationTree(NavigationTree navigationTree);
        public Task<bool> CheckCategoryListForUnique(List<string> CategoryNames);
        public Task<bool> ChechSubCategoryToBeInCategory(string CategoryId, string SubCategoryName);
        public Task<bool> CheckTeamToBeInSubCategory(string SubCategoryId, string TeamName);
    }
}