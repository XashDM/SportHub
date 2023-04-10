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
                var response = await connection.QueryAsync<User>($"SELECT * FROM user WHERE email = '{email}';");
                User user = response?.FirstOrDefault();

                return user;
            }
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = "SELECT * FROM user";
                var users = await connection.QueryAsync<User>(sql);
                
                return users;
            }  
        }

        public async Task InsertOneAsync(User user)
        {
            using (var connection = _dbConnectionFactory.GetConnection())
            {
                connection.Open();
                var sql = "INSERT INTO User (isActivated, isAdmin, password, email, firstName, secondName) " +
                          "VALUES (@isActivated, @isAdmin, @password, @email, @firstName, @secondName)";
                await connection.ExecuteAsync(sql, user);
            }
        }
    }
}

