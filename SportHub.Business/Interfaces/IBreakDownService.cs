using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces;

public interface IBreakDownService
{
    Task CreateBreakDownsAsync(IEnumerable<BreakDown> breakDowns);
    Task<IEnumerable<BreakDown>> GetBreakDownsAsync(string languageId);

    Task<IEnumerable<IEnumerable<FullLanguageSpecificArticle>>> GetBreakDownsArticlesAsync(string languageId,
        ArticleSearchOptions articleSearchOptions);
}