using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces
{
    public interface IArticlesService
    {
        Task<IReadOnlyCollection<Article>> GetArticles();
    }
}
