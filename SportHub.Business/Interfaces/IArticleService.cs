using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task PostArticleAsync(Article article, ArticleInfo[] articleInfos);
	}
}