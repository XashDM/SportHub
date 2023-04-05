using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface IArticleRepository
    {
        Task<IReadOnlyCollection<Article>> GetArticlesAsync();
    }
}
