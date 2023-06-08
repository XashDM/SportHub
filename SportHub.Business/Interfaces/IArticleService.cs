using Microsoft.AspNetCore.Http;
using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article, Image image, IFormFile file);
		Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language);
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);
	}
}