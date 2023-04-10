namespace SportHub.Data.Interfaces
{
   public interface ITokenRepository
   {
       Task<string> GetIdByTokenAsync(string token);
   
       Task DeleteRefreshTokenAsync(string token);
   
       Task WriteTokenInDbAsync(string token, string id);
   } 
}

