using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class MainArticlesRepository : IMainArticlesRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public MainArticlesRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string languageId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var getMainArticlesSql = $"SELECT * FROM MainArticles where LanguageId='{languageId}';";
            var response = await connection.QueryAsync<MainArticle>(getMainArticlesSql);
            
            return response;
        }
    }

    public async Task CreateMainArticleAsync(MainArticle mainArticle)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();

            using (var transaction = connection.BeginTransaction())
            {
                var createMainArticleSql = $"INSERT INTO MainArticles(MainArticleId, ArticleId, LanguageId, `Order`)" +
                                           " VALUES(@MainArticleId, @ArticleId, @LanguageId, @Order);";
                await connection.ExecuteAsync(createMainArticleSql, mainArticle, transaction);
                
                transaction.Commit();
            }
        }
    }

    public async Task DeleteAllMainArticlesByLanguageIdAsync(string languageId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var deleteAllMainArticlesByLanguageShortTitleSql = $"DELETE FROM MainArticles WHERE LanguageId='{languageId}';";
            await connection.ExecuteAsync(deleteAllMainArticlesByLanguageShortTitleSql);
        }
    }
}