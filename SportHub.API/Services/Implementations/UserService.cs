

using System.Configuration;
using Dapper;
using MySql.Data.MySqlClient;
using SportHub.Models;

namespace SportHub.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        
        private readonly string _connectionString;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<User>("SELECT * FROM user");
            }  
        }
    }
}

