using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services
{
    public class ArticlesService : IArticlesService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticlesService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<IReadOnlyCollection<Article>> GetArticles()
        {
            return await _articleRepository.GetArticlesAsync();
        }
    }
}
