using Microsoft.AspNetCore.Http;
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

		public async Task CreateArticleAsync(Article article, Image image, IFormFile file)
		{
			var articleId = Guid.NewGuid().ToString();

			article.ArticleId = articleId;
			foreach(var el in article.Infos)
			{
				el.ArticleId = articleId;
			}
			article.PublishingDate = DateTime.Now;

			var imageId = Guid.NewGuid().ToString();

			var fileName = imageId + Path.GetExtension(file.FileName);
			var parentPath = Directory.GetParent(Directory.GetCurrentDirectory());
			var filePath = Path.Combine(parentPath.FullName, "SportHub.Database\\Images", fileName);
			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			article.ImageId = imageId;
			image.ImageId = imageId;
			image.Url = filePath;

			await _articleRepository.CreateArticleAsync(article, image);
		}
		
		public async Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language)
		{
			var article = await _articleRepository.GetArticleByIdAndLanguageAsync(id, language);
			
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
	}
}