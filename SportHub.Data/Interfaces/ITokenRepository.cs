namespace SportHub.Data.Interfaces
{
   public interface ITokenRepository
   {
       Task<string> GetEmailByTokenAsync(string token);
   
       Task DeleteRefreshTokenAsync(string token);
   
       Task WriteTokenInDbAsync(string token, string email);
   } 
}

