using Dapper;
using Org.BouncyCastle.Asn1.Ocsp;
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

    public async Task AppendNavigationTree(NavigationTree navigationTree)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    var sql = "INSERT INTO categories (CategoryId,CategoryName) " +
                              "VALUES (@CategoryId, @CategoryName);";
                    await connection.ExecuteAsync(sql, navigationTree.Categories);

                    sql = "INSERT INTO subcategories (SubCategoryId,SubCategoryName,CategoryId) " +
                        "VALUES (@SubCategoryId, @SubCategoryName, @CategoryId);";
                    await connection.ExecuteAsync(sql, navigationTree.SubCategories);

                    sql = "INSERT INTO teams (TeamId,TeamName,TeamDescription,SubCategoryId) " +
                          "VALUES (@TeamId, @TeamName,@TeamDescription,@SubCategoryId);";
                    await connection.ExecuteAsync(sql, navigationTree.Teams);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Transaction error");
                }
            }                
        }
    }

    public async Task<bool> CheckCategoryListForUnique(List<string> CategoryNames)
    {
      
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM categories" +
                      $" WHERE CategoryName IN ('{string.Join("', '", CategoryNames)}')";

            var Categories = await connection.QueryAsync<Category>(sql);

            return Categories.Any();
        }
    }

    public async Task<bool> ChechSubCategoryToBeInCategory(string CategoryId,string SubCategoryName)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM subcategories" +
                      $" WHERE CategoryId='{CategoryId}' AND SubCategoryName='{SubCategoryName}'";
            var subCategories = await connection.QueryAsync<SubCategory>(sql);

            return subCategories.Any(); 
        }
    }

    public async Task<bool> CheckTeamToBeInSubCategory(string SubCategoryId,string TeamName)
    {
        using (var connection = _dbConnectionFactory.GetConnection())
        {
            connection.Open();
            var sql = $"SELECT * FROM teams" +
                      $" WHERE SubCategoryId='{SubCategoryId}' AND TeamName='{TeamName}'";
            var teams = await connection.QueryAsync<Team>(sql);

            return teams.Any();
        }
    }
}