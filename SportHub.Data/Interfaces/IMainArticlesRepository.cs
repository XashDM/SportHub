using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces;

public interface IMainArticlesRepository
{
    Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string languageId);
    Task CreateMainArticleAsync(MainArticle mainArticle);
    Task DeleteAllMainArticlesByLanguageIdAsync(string languageId);
}