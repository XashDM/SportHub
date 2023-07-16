using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces;

public interface IBreakDownService
{
    Task CreateBreakDownsAsync(string languageId, IEnumerable<BreakDown> breakDowns);
    Task<IEnumerable<BreakDown>> GetBreakDownsByLanguageIdAsync(string languageId);
    Task<IEnumerable<BreakDown>> GetBreakDownsByLanguageAsync(string language);
    Task<List<BreakDownResponse>> GetBreakDownsArticlesAsync(string language, ArticleSearchOptions articleSearchOptions);
    Task<List<NavigationTree>> GetBreakDownsDetailsAsync(string languageId);
}