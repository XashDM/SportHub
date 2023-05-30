using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article);
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId);
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);

		Task<IEnumerable<ArticleForAutocomplete>> GetArticleForAutocompleteByLanguageIdAndPropertyIdAsync(string languageId,
			string propertyIdName, string propertyId);
	}
}