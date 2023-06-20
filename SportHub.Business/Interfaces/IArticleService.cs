using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article);
		Task<FullLanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<FullLanguageSpecificArticle> GetArticleByIdAndLanguageIdAsync(string articleId, string languageId);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions);
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);
		Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
		Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetMainArticlesDetailsByLanguageIdAsync(string languageId);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber);
	}
}