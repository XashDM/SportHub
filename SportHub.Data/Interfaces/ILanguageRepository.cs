using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface ILanguageRepository
    {
        Task<IEnumerable<Language>> GetLanguagesAsync();
        Task<Language> GetLanguageByTitleAsync(string shortTitle);
        Task AddLanguageAsync(Language language);
        Task ChangeLanguageIsActiveAsync(string shortTitle, bool isActive);
        Task DeleteLanguageAsync(string shortTitle);
    }
}
