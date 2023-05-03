using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article);
	}
}