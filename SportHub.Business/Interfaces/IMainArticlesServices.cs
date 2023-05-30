using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces;

public interface IMainArticlesServices
{
    Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
    Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
    Task<IEnumerable<ArticleForMainArticleForm>> GetMainArticlesWithAdditionalInformationByLanguageIdAsync(string languageId);
}