using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task CreateArticleAsync(Article article);
		
		Task<Article> GetArticleAsync(int id);
	}
}