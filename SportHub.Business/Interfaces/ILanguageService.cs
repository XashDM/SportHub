using SportHub.Data.Entities;
using SportHub.Data.DTO;

namespace SportHub.Business.Interfaces
{
    public interface ILanguageService
    {
        Task<IEnumerable<Language>> GetLanguagesAsync();
        Task<Language> GetLanguageByTitleAsync(string shortTitle);
        Task<Language> GetLanguageByIdAsync(string id);
        Task AddLanguagesAsync(IEnumerable<Language> languages);
        Task ChangeLanguageIsActiveAsync(string shortTitle, bool isActive);
        Task DeleteLanguageAsync(string shortTitle);
    }
}
