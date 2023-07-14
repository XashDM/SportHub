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

    public BreakDownService(IBreakDownRepository breakDownRepository, IArticleService articleService, ITeamsService teamsService,
        ISubCategoryService subCategoryService, ICategoryService categoryService)
    {
        _breakDownRepository = breakDownRepository;
        _articleService = articleService;
        _teamsService = teamsService;
        _subCategoryService = subCategoryService;
        _categoryService = categoryService;
    }

    public async Task CreateBreakDownsAsync(string languageId, IEnumerable<BreakDown> breakDowns)
    {
        foreach (var breakDown in breakDowns)
        {
            breakDown.BreakDownId = Guid.NewGuid().ToString();
        }

        await _breakDownRepository.CreateBreakDownsAsync(languageId, breakDowns);
    }

    public async Task<IEnumerable<BreakDown>> GetBreakDownsAsync(string languageId)
    {
        return await _breakDownRepository.GetBreakDownsAsync(languageId);
    }
    
    public async Task<List<BreakDownResponse>> GetBreakDownsArticlesAsync(string languageId, ArticleSearchOptions articleSearchOptions)
    {
        var breakDowns = await GetBreakDownsAsync(languageId);
        
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
            
            var breakDownArticles = await _articleService.GetAllArticlesByFiltersAsync(languageId, searchOptions);
            breakDownsResponse.Add(new BreakDownResponse
            {
                GroupName = groupName,
                Articles = breakDownArticles,
            });
        }
        
        return breakDownsResponse;
    }

    public async Task<List<BreakDownDetailsDTO>> GetBreakDownsDetailsAsync(string languageId)
    {
        IEnumerable<BreakDown> breakDowns = await GetBreakDownsAsync(languageId);
        
        List<BreakDownDetailsDTO> breakDownDetails = new List<BreakDownDetailsDTO>();
        foreach (var breakDown in breakDowns)
        {
            breakDownDetails.Add(await MapToBreakDownsDetails(breakDown));
        }

        return breakDownDetails;
    }

    private async Task<BreakDownDetailsDTO> MapToBreakDownsDetails(BreakDown breakDown)
    {
        BreakDownDetailsDTO breakDownDetails = new BreakDownDetailsDTO();

        breakDownDetails.Category = await _categoryService.GetCategoryByIdAsync(breakDown.CategoryId);
        if (breakDown.SubCategoryId != null)
        {
            breakDownDetails.SubCategory = await _subCategoryService.GetSubCategoriesByIdAsync(breakDown.SubCategoryId);
        }
        if (breakDown.TeamId != null)
        {
            breakDownDetails.Team = await _teamsService.GetTeamByIdAsync(breakDown.TeamId);
        }

        return breakDownDetails;
    }
}