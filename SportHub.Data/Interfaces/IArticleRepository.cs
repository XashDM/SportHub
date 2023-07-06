using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task CreateArticleAsync(Article article, Image image);
		Task UpdateArticleAsync(Article article, Image image);
		Task<Article> GetArticleByIdAsync(string articleId);
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions);
		Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId);
		Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string language);
		Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
		Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
		Task DeleteAllMainArticlesByLanguageIdAsync(string languageId);
		Task<IEnumerable<LanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber);
		Task<IEnumerable<LanguageSpecificArticle>> GetPageOfSearchArticlesAsync(string language, string findText, int pageNumber, int pageSize);
	}
}