using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace SportHub.Database.Config
{
    class Config
    {
       public static string server = "localhost";
       public static string uid = "user";
       public static string password = "root";
       public static string port = "3306";
       public static string scriptFilePath = @"CreateDB.sql";
       public static string connectionString = $"server={server}; port={port}; uid={uid};pwd={password};"; 
    }
}
