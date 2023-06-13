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
		
		public ArticleService(IArticleRepository articleRepository, INavigationService navigationService, IImageService imageService,
			ISubCategoryService subCategoryService, ILocationService locationService, ITeamsService teamService)
		{
			_articleRepository = articleRepository;
			_imageService = imageService;
			_navigationService = navigationService;
			_subCategoryService = subCategoryService;
			_locationService = locationService;
			_teamService = teamService;
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
				
				var fullArticle = new FullLanguageSpecificArticle
				{
					ArticleId = article.ArticleId,
					PublishingDate = article.PublishingDate,
					MainText = article.MainText,
					Title = article.Title,
					Subtitle = article.Subtitle,
					AuthorId = article.AuthorId,
					Language = language,
						
					SubCategory = articleSubCategory.SubCategoryName,
					ImageUrl = articleImage.Url,
					Location = articleLocation.LocationName,
					Team = articleTeam.TeamName
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