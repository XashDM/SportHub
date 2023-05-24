using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services;

public class NavigationService : INavigationService
{
    private readonly INavigationRepository _navigationRepository;
    
    public NavigationService(INavigationRepository navigationRepository)
    {
        _navigationRepository = navigationRepository;
    }

    public async Task<Category> GetCategoryBySubCategoryId(string id)
    {
        var category = await _navigationRepository.GetCategoryBySubCategoryId(id);
        
        return category;
    }
}