using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task CreateArticleAsync(Article article);
		
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);

		Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId);

		Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, Dictionary<string, object> parametersDictionary);
		
		Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string language);
		
		Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId);
		Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles);
		Task DeleteAllMainArticlesByLanguageIdAsync(string languageId);
	}
}