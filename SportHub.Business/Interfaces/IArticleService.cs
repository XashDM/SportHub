using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article, Image image, string fileName);
		Task<FullLanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetPageOfSearchArticlesAsync(string language, string findText, int pageNumber, int pageSize);
		Task<FullLanguageSpecificArticle> GetArticleByIdAndLanguageIdAsync(string articleId, string languageId);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions);
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);
		Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
		Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
		Task<IEnumerable<FullLanguageSpecificArticle>> GetMainArticlesDetailsByLanguageIdAsync(string languageId);
	}
}