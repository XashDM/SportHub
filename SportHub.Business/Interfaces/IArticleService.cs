using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article, Image image, string fileName);
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId);

		Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions);
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);
		Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
		Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
		Task<IEnumerable<LanguageSpecificArticle>> GetMainArticlesDetailsByLanguageIdAsync(string languageId);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber);
	}
}