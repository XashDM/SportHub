using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task CreateArticleAsync(Article article);
		
		Task<FullArticle> GetArticleAsync(string id);
	}
}