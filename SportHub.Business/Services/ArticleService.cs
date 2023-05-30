using SportHub.Business.Interfaces;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Implementations
{
	public class ArticleService : IArticleService
	{
		private readonly IArticleRepository _articleRepository;
		private readonly INavigationService _navigationService;
		private readonly IImageService _imageService;

		public ArticleService(IArticleRepository articleRepository, INavigationService navigationService, IImageService imageService)
		{
			_articleRepository = articleRepository;
			_imageService = imageService;
			_navigationService = navigationService;
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
		
		public async Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language)
		{
			var article = await _articleRepository.GetArticleByIdAndLanguageAsync(id, language);
			
			return article;
		}

		public async Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId,
			string languageId)
		{
			var article = await _articleRepository.GetArticleByArticleIdAndLanguageIdAsync(articleId, languageId);

			return article;
		}
		
		public async Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language)
		{
			var mainArticlesMetadata = await _articleRepository.GetMainArticlesAsync(language);
			mainArticlesMetadata = mainArticlesMetadata.OrderBy(mainArticle => mainArticle.Order);
			
			var mainArticles = new List<MainArticleInfo>();
			
			foreach (var mainArticleData in mainArticlesMetadata)
			{
				var article = await _articleRepository.GetArticleByIdAndLanguageAsync(mainArticleData.ArticleId, language);
				var articleImage = await _imageService.GetImageById(article.ImageId);
				var articleCategory = await _navigationService.GetCategoryBySubCategoryId(article.SubCategoryId);
				
				var mainArticleInfo = new MainArticleInfo
				{
					ArticleId = article.ArticleId,
					PublishingDate = article.PublishingDate,
					MainText = article.MainText,
					Title = article.Title,
					Subtitle = article.Subtitle,
						
					Category = articleCategory.CategoryName,
					ImageUrl = articleImage.Url
				};
				
				mainArticles.Add(mainArticleInfo);
			}
		
			return mainArticles;
		}

		public async Task<IEnumerable<ArticleForAutocomplete>>
			GetArticleForAutocompleteByLanguageIdAndPropertyIdAsync(string languageId, string propertyIdName, string propertyId)
		{
			IEnumerable<Article> articles = await _articleRepository.GetArticlesByLanguageIdAndPropertyIdAsync(languageId, propertyIdName, propertyId);
			List<ArticleForAutocomplete> articlesForAutocompletes = new List<ArticleForAutocomplete>();

			foreach (Article article in articles)
			{
				ArticleForAutocomplete articleForAutocomplete = new ArticleForAutocomplete();
				articleForAutocomplete.ArticleId = article.ArticleId;

				if (article.Infos != null && article.Infos.Any())
					articleForAutocomplete.Title = article.Infos.FirstOrDefault().Title;
				else
					articleForAutocomplete.Title = "No title available";
				articlesForAutocompletes.Add(articleForAutocomplete);
			}

			return articlesForAutocompletes.AsEnumerable();
		}
	}
}