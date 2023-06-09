using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;

        public UserRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;

        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var response =
                    await connection.QueryFirstOrDefaultAsync<User>($"SELECT * FROM User WHERE Email = '{email}';");

                return response;
            }
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var response =
                    await connection.QueryFirstOrDefaultAsync<User>($"SELECT * FROM User WHERE UserId = '{id}';");

                return response;
            }
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = "SELECT * FROM User";
                var users = await connection.QueryAsync<User>(sql);

                return users;
            }
        }

        public async Task<string> InsertOneAsync(User user)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = "INSERT INTO User (UserId, IsActivated, IsAdmin, Password, Email, FirstName, LastName) " +
                          "VALUES (@UserId, @IsActivated, @IsAdmin, @Password, @Email, @FirstName, @LastName)";
                await connection.ExecuteAsync(sql, user);
            }

            return user.UserId;
        }

        public async Task UpdateUserAsync(User user)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = "UPDATE User SET IsActivated = @IsActivated, IsAdmin = @IsAdmin, Password = @Password, " +
                               "Email = @Email, FirstName = @FirstName, LastName = @LastName " +
                               "WHERE UserId = @UserId;";
                await connection.ExecuteAsync(sql, user);

            }
        }

        public async Task ActivateUserAccountAsync(string id)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = $"UPDATE User SET IsActivated = 1 WHERE UserId = '{id}';";
                await connection.ExecuteAsync(sql);

            }
        }

        public async Task ChangePasswordAsync(string userId, string password)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = $"UPDATE User SET Password = '{password}' WHERE UserId = '{userId}';";
                await connection.ExecuteAsync(sql);

            } 
        }
    }
}

