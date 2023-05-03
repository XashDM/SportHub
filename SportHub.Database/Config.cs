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
       public static string uid = "root";
       public static string password = "admin";
       public static string port = "3306";
       public static string scriptFilePath = @"../../../Scripts/CreateDB.sql";
       public static string connectionString = $"server={server}; port={port}; uid={uid};pwd={password};"; 
    }
}
