using System;
using MySql.Data.MySqlClient;
using System.IO;
namespace SQLScriptRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            string server = "localhost";
            string database = "SportHub";
            string uid = "root";
            string password = "root";
            string port = "5900";
            string scriptFilePath = @"CreateDB_script.sql";
            string connectionString = $"server={server};  port={port}; database={database};uid={uid};pwd={password};";
            try
            {
                string script = File.ReadAllText(scriptFilePath);
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(script, connection);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error creating database: " + ex.Message);
            }
        }
    }
}