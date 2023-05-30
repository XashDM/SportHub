using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task CreateArticleAsync(Article article);
		
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);

		Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId);
		
		Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string language);

		Task<IEnumerable<Article>> GetArticlesByLanguageIdAndPropertyIdAsync(string languageId, string propertyIdName, string propertyId);
	}
}