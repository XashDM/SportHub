using SportHub.Data.DTO;
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

        public async Task AppendNavigationTree(NavigationTree navigationTree)
        {
            try
            {
                List<string> categoryId = navigationTree.Categories.Select(x => x.CategoryId).ToList();
                CheckId(categoryId);
                List<string> newCategoryNames = navigationTree.Categories.Select(x => x.CategoryName).ToList();
                if (await _NavigationTreeRepository.CheckCategoryListForUnique(newCategoryNames))
                {
                    throw new Exception("Category already exists");
                }
                

                List<string> subCategoryId = navigationTree.SubCategories.Select(x => x.SubCategoryId).ToList();
                CheckId(subCategoryId);
                foreach (var subCategory in navigationTree.SubCategories)
                {
                    if (await _NavigationTreeRepository.ChechSubCategoryToBeInCategory(subCategory.CategoryId,subCategory.SubCategoryName))
                    {
                        throw new Exception("Subcategory already exists");
                    }
                }

                List<string> TeamId = navigationTree.Teams.Select(x => x.TeamId).ToList();
                CheckId(TeamId);
                foreach(var team in navigationTree.Teams)
                {
                    if (await _NavigationTreeRepository.CheckTeamToBeInSubCategory(team.SubCategoryId, team.TeamName))
                    {
                        throw new Exception("Team already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            await _NavigationTreeRepository.AppendNavigationTree(navigationTree);
        }

        public async Task DeleteFromNavigationTree(NavigationTreeDeleteDTO navigationTree)
        {
            try
            {            
                CheckId(navigationTree.Categories);

                CheckId(navigationTree.SubCategories);
            
                CheckId(navigationTree.Teams);        
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            await _NavigationTreeRepository.DeleteFromNavigationTree(navigationTree);
        }

        public async Task HideNavigationTree(NavigationTreeHideDTO navigationTree)
        {
            try 
            {
                List<string> categoryId = navigationTree.Categories.Select(x => x.id).ToList();
                CheckId(categoryId);

                List<string> subCategoryId = navigationTree.SubCategories.Select(x => x.id).ToList();
                CheckId(subCategoryId);

                List<string> TeamId = navigationTree.Teams.Select(x => x.id).ToList();
                CheckId(TeamId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            await _NavigationTreeRepository.HideNavigationTree(navigationTree);
        }

        private void CheckId(List<string> allId) 
        {
            foreach (var id in allId)
            {
                var isValid = Guid.TryParse(id, out _);
                if (!isValid)
                {
                    throw new Exception("wrong ID");
                }
            }
        }
    }

}