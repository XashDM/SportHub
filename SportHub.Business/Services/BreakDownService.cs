using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services;

public class BreakDownService : IBreakDownService
{
    private readonly IBreakDownRepository _breakDownRepository;
    private readonly IArticleService _articleService;

    public BreakDownService(IBreakDownRepository breakDownRepository, IArticleService articleService)
    {
        _breakDownRepository = breakDownRepository;
        _articleService = articleService;
    }

    public async Task CreateBreakDownsAsync(IEnumerable<BreakDown> breakDowns)
    {
        List<BreakDown> breakDownsList = breakDowns.ToList();
        for(int breakDownsCount = 0; breakDownsCount < breakDownsList.Count; breakDownsCount++)
        {
            breakDownsList[breakDownsCount].BreakDownId = Guid.NewGuid().ToString();
        }
        await _breakDownRepository.CreateBreakDownsAsync(breakDownsList);
    }

    public async Task<IEnumerable<BreakDown>> GetBreakDownsAsync(string languageId)
    {
        return await _breakDownRepository.GetBreakDownsAsync(languageId);
    }
    
    public async Task<IEnumerable<IEnumerable<FullLanguageSpecificArticle>>> GetBreakDownsArticlesAsync(string languageId, ArticleSearchOptions articleSearchOptions)
    {
        var breakDowns = await GetBreakDownsAsync(languageId);

        List<IEnumerable<FullLanguageSpecificArticle>> articles = new List<IEnumerable<FullLanguageSpecificArticle>>();
        foreach (var breakDown in breakDowns)
        {
            var searchOptions = articleSearchOptions;
            if (breakDown.TeamId != null)
            {
                searchOptions.TeamId = breakDown.TeamId;
            }
            else if (breakDown.SubCategoryId != null)
            {
                searchOptions.SubCategoryId = breakDown.SubCategoryId;
            }
            else
            {
                searchOptions.CategoryId = breakDown.CategoryId;
            }
            articles.Add(await _articleService.GetAllArticlesByFiltersAsync(languageId, searchOptions));
        }
        
        return articles;
    }
}