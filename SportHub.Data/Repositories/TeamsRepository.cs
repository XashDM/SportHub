using Dapper;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class TeamsRepository : ITeamsRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public TeamsRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = "SELECT * FROM teams";
            var teams = await connection.QueryAsync<Team>(sql);
            return teams;
        }
    }

    public async Task<Team> GetTeamByIdAsync(string TeamId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM teams WHERE TeamId='{TeamId}'";
            var team = await connection.QueryFirstOrDefaultAsync<Team>(sql);

            return team;
        }
    }

    public async Task<IEnumerable<Team>> GetTeamsBySubcategoryIdAsync(string SubCategoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM teams WHERE SubCategoryId='{SubCategoryId}' ";
            var teams = await connection.QueryAsync<Team>(sql);

            return teams;
        }
    }
    
    public async Task<IEnumerable<Team>> GetTeamsByCategoryIdAsync(string categoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql =
                $"SELECT * FROM Teams t " +
                $"JOIN Subcategories s ON t.subcategoryId = s.subcategoryId WHERE s.categoryId = '{categoryId}';";
            var teams = await connection.QueryAsync<Team>(sql);

            return teams;
        }
    }
    
    public async Task<string> CreateTeamAsync(Team team)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = "INSERT INTO teams (TeamId,TeamName,TeamDescription,SubCategoryId) " +
                      "VALUES (@TeamId, @TeamName,@TeamDescription,@SubCategoryId);";
            await connection.ExecuteAsync(sql, team);
        }

        return team.TeamId;
    }

    public async Task UpdateTeamAsync(string TeamId,TeamChangeDto teamChange)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"UPDATE teams SET TeamName = '{teamChange.TeamName}'," +
                      $"TeamDescription = '{teamChange.TeamDescription}'"+
                      $"WHERE TeamId = '{TeamId}';";
            await connection.ExecuteAsync(sql);

        }
    }

    public async Task UpdateSubcategoryOfTeamAsync(string TeamId, string SubCategoryId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"UPDATE teams SET SubCategoryId = '{SubCategoryId}'" +
                      $"WHERE TeamId = '{TeamId}';";
            await connection.ExecuteAsync(sql);

        }
    }

    public async Task DeleteTeamAsync(string TeamId)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"DELETE FROM teams WHERE TeamId='{TeamId}';";
            await connection.ExecuteAsync(sql);
        }
    }
}