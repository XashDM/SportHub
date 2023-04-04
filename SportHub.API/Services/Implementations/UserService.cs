

using System.Configuration;
using Dapper;
using MySql.Data.MySqlClient;
using SportHub.Models;

namespace SportHub.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly string _connectionString;

        public UserService(IConfiguration configuration)
        {
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
        
        // public async Task<User> GetUserByIdAsync(string id)
        // {
        //     using (var connection = new MySqlConnection(_connectionString))
        //     {
        //         connection.Open();
        //         return connection.Query<User>($"SELECT * FROM user WHERE userId = {id};").First();
        //     }  
        // }
        
        public async Task<User> GetUserByEmailAsync(string email)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var user = connection.Query<User>($"SELECT * FROM user WHERE email = '{email}';")?.FirstOrDefault();
                 
                return user;
            }  
        }
    }
}

