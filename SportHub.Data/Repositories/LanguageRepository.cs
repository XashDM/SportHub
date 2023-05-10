using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories
{
    public class LanguageRepository : ILanguageRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;

        public LanguageRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task DeleteLanguageAsync(string shortTitle)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = $"DELETE FROM language WHERE ShortTitle='{shortTitle}';";
                await connection.ExecuteAsync(sql);
            }
        }

        public async Task AddLanguagesAsync(IEnumerable<Language> languages)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    var sql = "INSERT INTO Language (LanguageId, ShortTitle, IsActive) " +
                    "VALUES (@LanguageId, @ShortTitle, @IsActive);";
                    foreach (var language in languages)
                    {
                        // IsActive = 0 because after adding new language it shouldn't activate immediately
                        await connection.ExecuteAsync(sql, new { LanguageId = language.LanguageId, ShortTitle = language.ShortTitle, IsActive = 0 });
                    }
                    transaction.Commit();
                }
            }
        }

        public async Task ChangeLanguageIsActiveAsync(string shortTitle, bool isActive)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = $"UPDATE Language SET IsActive = {isActive} WHERE ShortTitle = '{shortTitle}';";
                await connection.ExecuteAsync(sql);
            }
        }

        public async Task<Language> GetLanguageByTitleAsync(string shortTitle)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = $"SELECT * FROM language WHERE ShortTitle='{shortTitle}';";
                var response = await connection.QueryFirstOrDefaultAsync<Language>(sql);

                return response;
            }
        }

        public async Task<IEnumerable<Language>> GetLanguagesAsync()
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = "SELECT * FROM language";
                var response = await connection.QueryAsync<Language>(sql);

                return response;
            }
        }
    }
}
