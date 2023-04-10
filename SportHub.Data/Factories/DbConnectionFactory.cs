using System.Data;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Factories;

public class DbConnectionFactory: IDbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection");

    }
    
    public IDbConnection GetConnection()
    {
        return new MySqlConnection(_connectionString);
    }
    
}