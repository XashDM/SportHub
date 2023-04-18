using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
	public interface IArticleRepository
	{
		Task PostArticleAsync(Article article);
		Task PostArticleInfosAsync(ArticleInfo[] articleInfos);
	}
}