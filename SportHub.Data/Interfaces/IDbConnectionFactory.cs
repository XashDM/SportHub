using System.Data;

namespace SportHub.Data.Interfaces
{
    public interface IDbConnectionFactory
    {
        IDbConnection GetConnection();
    }
}

