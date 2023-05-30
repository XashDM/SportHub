using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services;

public class MainArticlesServices : IMainArticlesServices
{
    private readonly IMainArticlesRepository _mainArticlesRepository;
    private readonly IArticleService _articleService;
    private readonly ICategoryService _categoryService;
    private readonly ISubCategoryService _subCategoryService;
    private readonly ITeamsService _teamsService;
    
    public MainArticlesServices(IMainArticlesRepository mainArticlesRepository, IArticleService articleService,
        ICategoryService categoryService, ISubCategoryService subCategoryService, ITeamsService teamsService)
    {
        _mainArticlesRepository = mainArticlesRepository;
        _articleService = articleService;
        _categoryService = categoryService;
        _subCategoryService = subCategoryService;
        _teamsService = teamsService;
    }

    public async Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId)
    {
        var mainArticles = await _mainArticlesRepository.GetMainArticlesAsync(languageId);

        return mainArticles;
    }

    public async Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles)
    {
        await _mainArticlesRepository.DeleteAllMainArticlesByLanguageIdAsync(mainArticles.First().LanguageId);
        foreach (var mainArticle in mainArticles)
        {
            await _mainArticlesRepository.CreateMainArticleAsync(mainArticle);
        }
    }
    
    public async Task<IEnumerable<ArticleForMainArticleForm>> GetMainArticlesWithAdditionalInformationByLanguageIdAsync(string languageId)
    {
        List<ArticleForMainArticleForm> articlesWithTree = new List<ArticleForMainArticleForm>();
        IEnumerable<MainArticle> mainArticles = await _mainArticlesRepository.GetMainArticlesAsync(languageId);
        
        foreach (var mainArticle in mainArticles)
        {
            var articleWithTree = new ArticleForMainArticleForm();
            
            var article = await _articleService.GetArticleByArticleIdAndLanguageIdAsync(mainArticle.ArticleId, languageId);
            var category = await _categoryService.GetCategoryByIdAsync(article.CategoryId);
            var subCategory = await _subCategoryService.GetSubCategoriesByIdAsync(article.SubCategoryId);
            var team = await _teamsService.GetTeamByIdAsync(article.TeamId);

            articleWithTree = new ArticleForMainArticleForm
                {
                    ArticleId = article.ArticleId,
                    Title = article.Title,
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    SubCategoryId = subCategory.SubCategoryId,
                    SubCategoryName = subCategory.SubCategoryName,
                    TeamId = team.TeamId,
                    TeamName = team.TeamName,
                    Order = mainArticle.Order
                };
            articlesWithTree.Add(articleWithTree);
        }
        
        return articlesWithTree.AsEnumerable();
    }
}