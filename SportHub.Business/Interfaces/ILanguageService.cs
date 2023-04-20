using SportHub.Data.Entities;
using SportHub.Data.DTO;

namespace SportHub.Business.Interfaces
{
    public interface ILanguageService
    {
        Task<IEnumerable<LanguageResponse>> GetLanguagesAsync();
        Task<Language> GetLanguageByTitleAsync(string shortTitle);
        Task AddLanguageAsync(LanguageRequest languageDTO);
        Task ChangeLanguageIsActiveAsync(string shortTitle, bool isActive);
        Task DeleteLanguageAsync(string shortTitle);
    }
}
