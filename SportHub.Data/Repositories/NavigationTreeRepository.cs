using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class NavigationTreeRepository : INavigationTreeRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public NavigationTreeRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task CreateByNavigationTree(NavigationTree navigationTree)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            foreach (var category in navigationTree.Categories)
            {
                var sql = "INSERT INTO categories (CategoryId,CategoryName) " +
                          "VALUES (@CategoryId, @CategoryName);";
                await connection.ExecuteAsync(sql, category);
            }

            foreach (var subCategory in navigationTree.SubCategories)
            {
                var sql = "INSERT INTO subcategories (SubCategoryId,SubCategoryName,CategoryId) " +
                    "VALUES (@SubCategoryId, @SubCategoryName, @CategoryId);";
                await connection.ExecuteAsync(sql, subCategory);
            }

            foreach (var team in navigationTree.Teams)
            {
                var sql = "INSERT INTO teams (TeamId,TeamName,TeamDescription,SubCategoryId) " +
                "VALUES (@TeamId, @TeamName,@TeamDescription,@SubCategoryId);";
                await connection.ExecuteAsync(sql, team);
            }
               
            
        }
    }
}