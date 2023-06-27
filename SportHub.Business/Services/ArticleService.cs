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
            var pageOfFullArticles = await MapToFullLanguageSpecificArticles(pageOfArticles);
            return pageOfFullArticles;
        }

        public async Task<IEnumerable<FullLanguageSpecificArticle>> GetPageOfSearchArticlesAsync(string language, string findText, int pageNumber, int pageSize)
        {
            var pageOfArticles = await _articleRepository.GetPageOfSearchArticlesAsync(language, findText, pageNumber, pageSize);
            var pageOfFullArticles = await MapToFullLanguageSpecificArticles(pageOfArticles);
            return pageOfFullArticles;
        }

        public async Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId)
		{
			var article = await _articleRepository.GetArticleByArticleIdAndLanguageIdAsync(articleId, languageId);

			return article;
		}
		
		public async Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions)
		{
			
			var articles = await _articleRepository.GetAllArticlesByFiltersAsync(languageId, articleSearchOptions);
			
			return articles;
		}
		
		public async Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language)
		{
			var mainArticlesMetadata = await _articleRepository.GetMainArticlesAsync(language);
			mainArticlesMetadata = mainArticlesMetadata.OrderBy(mainArticle => mainArticle.Order);
            var mainArticleInfos = await MapToMainArticleInfos(mainArticlesMetadata, language);

            return mainArticleInfos;
        }

		public async Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId)
		{
			var mainArticles = await _articleRepository.GetMainArticlesByLanguageIdAsync(languageId);

			return mainArticles;
		}

		public async Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles)
		{
			List<MainArticle> mainArticlesList = mainArticles.ToList();
			for(int mainArticlesCount = 0; mainArticlesCount < mainArticlesList.Count; mainArticlesCount++)
			{
				mainArticlesList[mainArticlesCount].MainArticleId = Guid.NewGuid().ToString();
			}
			await _articleRepository.CreateMainArticlesAsync(mainArticlesList);
		}
    
		public async Task<IEnumerable<LanguageSpecificArticle>> GetMainArticlesDetailsByLanguageIdAsync(string languageId)
		{
			List<LanguageSpecificArticle> articles = new List<LanguageSpecificArticle>();
			IEnumerable<MainArticle> mainArticles = await _articleRepository.GetMainArticlesByLanguageIdAsync(languageId);
        
			foreach (var mainArticle in mainArticles)
				articles.Add(await _articleRepository.GetArticleByArticleIdAndLanguageIdAsync(mainArticle.ArticleId, mainArticle.LanguageId));
        
			return articles;
		}
	
		private async Task<IEnumerable<FullLanguageSpecificArticle>> MapToFullLanguageSpecificArticles(IEnumerable<LanguageSpecificArticle> articles)
        {
            var fullArticles = new List<FullLanguageSpecificArticle>();

            foreach (var article in articles)
            {
                var articleImage = await _imageService.GetImageById(article.ImageId);
                var articleLocation = await _locationService.GetLocationByIdAsync(article.LocationId);
                var articleSubCategory = await _subCategoryService.GetSubCategoriesByIdAsync(article.SubCategoryId);
                var articleTeam = await _teamService.GetTeamByIdAsync(article.TeamId);
                var category = await _categoryService.GetCategoryByIdAsync(article.CategoryId);

                var fullArticle = new FullLanguageSpecificArticle
                {
                    ArticleId = article.ArticleId,
                    PublishingDate = article.PublishingDate,
                    MainText = article.MainText,
                    Title = article.Title,
                    Subtitle = article.Subtitle,
                    AuthorId = article.AuthorId,
                    Language = article.LanguageId,

                    SubCategory = articleSubCategory,
                    Image = articleImage,
                    Location = articleLocation,
                    Team = articleTeam,
                    Category = category
                };

                fullArticles.Add(fullArticle);

            }

            return fullArticles;
        }

        private async Task<IEnumerable<MainArticleInfo>> MapToMainArticleInfos(IEnumerable<MainArticle> mainArticles, string language)
        {
            var mainArticleInfos = new List<MainArticleInfo>();

            foreach (var mainArticle in mainArticles)
            {
                var article = await _articleRepository.GetArticleByIdAndLanguageAsync(mainArticle.ArticleId, language);
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

                mainArticleInfos.Add(mainArticleInfo);
            }

            return mainArticleInfos;
        }
	}
}