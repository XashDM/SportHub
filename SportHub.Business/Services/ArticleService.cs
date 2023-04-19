using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
	public class ArticleService : IArticleService
	{
		private readonly IArticleRepository _articleRepository;

		public ArticleService(IArticleRepository articleRepository)
		{
			_articleRepository = articleRepository;
		}

		public async Task PostArticleAsync(Article article, ArticleInfo[] articleInfos)
		{
			var articleId = Guid.NewGuid().ToString();

			article.ArticleId = articleId;
			foreach (var el in articleInfos)
			{
				el.ArticleId = article.ArticleId;
			}

			article.Published = false;

			await _articleRepository.PostArticleAsync(article);
			await _articleRepository.PostArticleInfosAsync(articleInfos);
		}
	}
}