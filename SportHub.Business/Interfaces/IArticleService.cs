using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces
{
	public interface IArticleService
	{
		Task PostArticleAsync(Article article, ArticleInfo[] articleInfos);
	}
}