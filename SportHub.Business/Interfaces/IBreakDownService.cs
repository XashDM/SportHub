using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces;

public interface IBreakDownService
{
    Task CreateBreakDownsAsync(string languageId, IEnumerable<BreakDown> breakDowns);
    Task<IEnumerable<BreakDown>> GetBreakDownsAsync(string languageId);

    Task<List<BreakDownResponse>> GetBreakDownsArticlesAsync(string languageId,
        ArticleSearchOptions articleSearchOptions);
}