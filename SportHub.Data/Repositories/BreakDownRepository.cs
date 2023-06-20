using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class BreakDownRepository : IBreakDownRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public BreakDownRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<BreakDown>> GetBreakDownsAsync(string languageId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var query = $"SELECT * FROM BreakDown where LanguageId='{languageId}';";
            var response = await connection.QueryAsync<BreakDown>(query);
            
            return response;
        }
    }

    public async Task DeleteAllBreakDownsAsync(string languageId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var query = $"DELETE FROM BreakDown WHERE LanguageId='{languageId}';";
            await connection.ExecuteAsync(query);
        }
    }

    public async Task CreateBreakDownsAsync(IEnumerable<BreakDown> breakDowns)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                string query;
				
                string languageId = breakDowns.First().LanguageId;
                await DeleteAllBreakDownsAsync(languageId);
				
                foreach (var breakDown in breakDowns)
                {
                    query = $"INSERT INTO BreakDown(BreakDownId, LanguageId, CategoryId, SubCategoryId, TeamId)" +
                            " VALUES(@BreakDownId, @LanguageId, @CategoryId, @SubCategoryId, @TeamId);";
                    await connection.ExecuteAsync(query, breakDown);
                }
                transaction.Commit();
            }
        }
    }
}