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
		private readonly ISubCategoryService _subCategoryService;
		private readonly ILocationService _locationService;
		private readonly ITeamsService _teamService;
		private readonly ICategoryService _categoryService;
		
		public ArticleService(IArticleRepository articleRepository, INavigationService navigationService, IImageService imageService,
			ISubCategoryService subCategoryService, ILocationService locationService, ITeamsService teamService, ICategoryService categoryService)
		{
			_articleRepository = articleRepository;
			_imageService = imageService;
			_navigationService = navigationService;
			_subCategoryService = subCategoryService;
			_locationService = locationService;
			_teamService = teamService;
			_categoryService = categoryService;
		}

		public async Task CreateArticleAsync(Article article, Image image, string fileName)
		{
			var articleId = Guid.NewGuid().ToString();

			article.ArticleId = articleId;
			foreach(var el in article.Infos)
			{
				el.ArticleId = articleId;
			}
			article.PublishingDate = DateTime.Now;

			var imageId = fileName.Substring(0, fileName.IndexOf('.'));

			article.ImageId = imageId;
			image.ImageId = imageId;
			image.Url = fileName;

			await _articleRepository.CreateArticleAsync(article, image);
		}
		
		public async Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language)
		{
			var article = await _articleRepository.GetArticleByIdAndLanguageAsync(id, language);
			
			return article;
		}
		public async Task<IEnumerable<FullLanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber)
		{
			var pageOfArticles = await _articleRepository.GetPageOfArticlesByCategoryAsync(language, categoryId, pageNumber);
			var pageOfFullArticles = new List<FullLanguageSpecificArticle>();

			foreach (var article in pageOfArticles)
			{
				var articleImage = await _imageService.GetImageById(article.ImageId);
				var articleLocation = await _locationService.GetLocationByIdAsync(article.LocationId);
				var articleSubCategory = await _subCategoryService.GetSubCategoriesByIdAsync(article.SubCategoryId);
				var articleTeam = await _teamService.GetTeamByIdAsync(article.TeamId);
				var category = await _categoryService.GetCategoryByIdAsync(categoryId);
				
				var fullArticle = new FullLanguageSpecificArticle
				{
					ArticleId = article.ArticleId,
					PublishingDate = article.PublishingDate,
					MainText = article.MainText,
					Title = article.Title,
					Subtitle = article.Subtitle,
					AuthorId = article.AuthorId,
					Language = language,
						
					SubCategory = articleSubCategory,
					Image = articleImage,
					Location = articleLocation,
					Team = articleTeam,
					Category = category
				};
				
				pageOfFullArticles.Add(fullArticle);

			}

			return pageOfFullArticles;
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