using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
	public class ArticleService : IArticleService
	{
		private readonly IArticleRepository _articleRepository;
		private readonly IUserRepository _userRepository;

		public ArticleService(IArticleRepository articleRepository, IUserRepository userRepository)
		{
			_articleRepository = articleRepository;
			_userRepository = userRepository;
		}

		public async Task CreateArticleAsync(Article article)
		{
			var articleId = Guid.NewGuid().ToString();

			article.ArticleId = articleId;
			foreach(var el in article.Infos)
			{
				el.ArticleId = articleId;
			}
			article.PublishingDate = DateTime.Now;

			await _articleRepository.CreateArticleAsync(article);
		}
		
		public async Task<FullArticle> GetArticleAsync(string id)
		{
			var article = await _articleRepository.GetArticleAsync(id);
			

			return article;
		}

		public async Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language)
		{
			var mainArticlesMetadata = await _articleRepository.GetMainArticlesAsync(language);
			mainArticlesMetadata = mainArticlesMetadata.OrderBy(mainArticle => mainArticle.Order);
			
			var mainArticles = new List<MainArticleInfo>();
			
			foreach (var mainArticleData in mainArticlesMetadata)
			{
				var fullArticle = await _articleRepository.GetArticleAsync(mainArticleData.ArticleId);
				
				var mainArticleInfo = new MainArticleInfo
				{
					ArticleId = fullArticle.ArticleId,
					Category = fullArticle.Category,
					ImageUrl = fullArticle.ImageUrl,
					PublishingDate = fullArticle.PublishingDate,
					Info = fullArticle.Infos.FirstOrDefault(info => info.Language == language)
				};
				
				mainArticles.Add(mainArticleInfo);
			}

			return mainArticles;
		}
	}
}