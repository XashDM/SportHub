using SportHub.Business.Interfaces;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services;

public class BreakDownService : IBreakDownService
{
    private readonly IBreakDownRepository _breakDownRepository;
    private readonly IArticleService _articleService;
    private readonly ITeamsService _teamsService;
    private readonly ISubCategoryService _subCategoryService;
    private readonly ICategoryService _categoryService;
    private readonly ILanguageService _languageService;

    public BreakDownService(IBreakDownRepository breakDownRepository, IArticleService articleService, ITeamsService teamsService,
        ISubCategoryService subCategoryService, ICategoryService categoryService, ILanguageService languageService)
    {
        _breakDownRepository = breakDownRepository;
        _articleService = articleService;
        _teamsService = teamsService;
        _subCategoryService = subCategoryService;
        _categoryService = categoryService;
        _languageService = languageService;
    }

    public async Task CreateBreakDownsAsync(string languageId, IEnumerable<BreakDown> breakDowns)
    {
        foreach (var breakDown in breakDowns)
        {
            breakDown.BreakDownId = Guid.NewGuid().ToString();
        }

        await _breakDownRepository.CreateBreakDownsAsync(languageId, breakDowns);
    }

    public async Task<IEnumerable<BreakDown>> GetBreakDownsByLanguageIdAsync(string languageId)
    {
        return await _breakDownRepository.GetBreakDownsByLanguageIdAsync(languageId);
    }
    
    public async Task<IEnumerable<BreakDown>> GetBreakDownsByLanguageAsync(string language)
    {
        return await _breakDownRepository.GetBreakDownsByLanguageAsync(language);
    }
    
    public async Task<List<BreakDownResponse>> GetBreakDownsArticlesAsync(string language, ArticleSearchOptions articleSearchOptions)
    {
        var breakDowns = await GetBreakDownsByLanguageAsync(language);
        
        List<BreakDownResponse> breakDownsResponse = new List<BreakDownResponse>();
        foreach (var breakDown in breakDowns)
        {
            var searchOptions = articleSearchOptions;
            var groupName = "";
            
            if (breakDown.TeamId != null)
            {
                searchOptions.TeamId = breakDown.TeamId;
                var team = await _teamsService.GetTeamByIdAsync(breakDown.TeamId);
                groupName = team.TeamName;
            }
            else if (breakDown.SubCategoryId != null)
            {
                searchOptions.SubCategoryId = breakDown.SubCategoryId;
                var subcategory = await _subCategoryService.GetSubCategoriesByIdAsync(breakDown.SubCategoryId);
                groupName = subcategory.SubCategoryName;
            }
            else
            {
                searchOptions.CategoryId = breakDown.CategoryId;
                var category = await _categoryService.GetCategoryByIdAsync(breakDown.CategoryId);
                groupName = category.CategoryName;
            }


            string languageId = (await _languageService.GetLanguageByTitleAsync(language)).LanguageId;
            var breakDownArticles = await _articleService.GetAllArticlesByFiltersAsync(languageId, searchOptions);
            breakDownsResponse.Add(new BreakDownResponse
            {
                GroupName = groupName,
                Articles = breakDownArticles,
            });
        }
        
        return breakDownsResponse;
    }

    public async Task<List<NavigationTree>> GetBreakDownsDetailsAsync(string languageId)
    {
        IEnumerable<BreakDown> breakDowns = await GetBreakDownsByLanguageIdAsync(languageId);

        List<NavigationTree> navigationTrees = new List<NavigationTree>();
        foreach (var breakDown in breakDowns)
        {
            navigationTrees.Add(await MapToNavigationTree(breakDown));
        }

        return navigationTrees;
    }

    private async Task<NavigationTree> MapToNavigationTree(BreakDown breakDown)
    {
        NavigationTree navigationTree = new NavigationTree();

        navigationTree.Categories = new List<Category>(){await _categoryService.GetCategoryByIdAsync(breakDown.CategoryId)};

        if (breakDown.SubCategoryId != null)
        {
            navigationTree.SubCategories = new List<SubCategory>(){await _subCategoryService.GetSubCategoriesByIdAsync(breakDown.SubCategoryId)};
        }
        if (breakDown.TeamId != null)
        {
            navigationTree.Teams = new List<Team>(){await _teamsService.GetTeamByIdAsync(breakDown.TeamId)};
        }

        return navigationTree;
    }
}