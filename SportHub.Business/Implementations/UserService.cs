using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Tls;
using SportHub.Data;
using SportHub.Data.DTOs;

namespace SportHub.Business.Implementations
{
    public class UserService : IUserService
    {
        private readonly string _connectionString;

        public UserService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        
        public async Task<IEnumerable<UserResponseDto>> GetUsersAsync()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var sql = "SELECT firstName, secondName, isAdmin, email FROM user";
                var users = await connection.QueryAsync<UserResponseDto>(sql);
                
                return users;
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
        
        public async Task<User> GetUserByEmailAsync(string email, string? password = null)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var response = await connection.QueryAsync<User>($"SELECT * FROM user WHERE email = '{email}';");
                User user = response?.FirstOrDefault();

                if (user == null || (string.IsNullOrEmpty(password) ? false : user.Password != password))
                {
                    return null;
                }

                return user;
            }
        }

        public async Task<bool> InsertOneAsync(UserRequestDto user)
        {
   
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                var sql = "INSERT INTO User (isActivated, isAdmin, password, email, firstName, secondName) " +
                          "VALUES (false, false, @password, @email, @firstName, @secondName)";
                await connection.ExecuteAsync(sql, user);
            }
            
            return true;
        }
    }
}

