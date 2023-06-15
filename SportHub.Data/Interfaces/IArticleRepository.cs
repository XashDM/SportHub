using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task CreateArticleAsync(Article article);
		
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		
		Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string language);
		Task<IEnumerable<LanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber);
	}
}