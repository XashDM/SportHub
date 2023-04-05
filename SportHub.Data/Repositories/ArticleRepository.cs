using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class ArticleRepository : IArticleRepository
{
    public async Task<IReadOnlyCollection<Article>> GetArticlesAsync()
    {
        //var sql = "SELECT TOP 10 * FROM Articles";
        //var articles = await connection.QueryAsync<Article>(sql);

        var articles = new List<Article>
            {
                new Article { Title = "A", Content = "A" },
                new Article { Title = "B", Content = "B" }
            };

        return await Task.FromResult(articles);
    }
}
