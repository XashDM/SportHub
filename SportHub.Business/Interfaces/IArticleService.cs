using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article);
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId);

		Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions);
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);
		Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
		Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
		Task<IEnumerable<LanguageSpecificArticle>> GetMainArticlesDetailsByLanguageIdAsync(string languageId);
	}
}