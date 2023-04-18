using System;
using MySql.Data.MySqlClient;
using System.IO;
using SportHub.Database.Config;
namespace SQLScriptRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                string script = File.ReadAllText(Config.scriptFilePath);
                using (MySqlConnection connection = new MySqlConnection(Config.connectionString))
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