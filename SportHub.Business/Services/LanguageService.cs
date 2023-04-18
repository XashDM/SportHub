using SportHub.Data.Entities;
using SportHub.Data.DTO;
using SportHub.Data.Interfaces;
using SportHub.Business.Interfaces;
using SportHub.Data.Repositories;

namespace SportHub.Business.Services
{
    public class LanguageService : ILanguageService
    {
        private readonly ILanguageRepository _languageRepository;

        public LanguageService(ILanguageRepository languageRepository)
        {
            _languageRepository = languageRepository;
        }

        public async Task DeleteLanguageAsync(string shortTitle)
        {
            await _languageRepository.DeleteLanguageAsync(shortTitle);
        }

        public async Task AddLanguageAsync(LanguageRequest languageDTO)
        {
            Language language = new Language
            {
                ShortTitle = languageDTO.ShortTitle,
                IsActive = languageDTO.IsActive
            };

            await _languageRepository.AddLanguageAsync(language);
        }

        public async Task ChangeLanguageIsActiveAsync(string shortTitle, bool isActive)
        {
            await _languageRepository.ChangeLanguageIsActiveAsync(shortTitle, isActive);
        }

        public async Task<Language> GetLanguageByTitleAsync(string shortTitle)
        {
            var language = await _languageRepository.GetLanguageByTitleAsync(shortTitle);

            if (language == null)
            {
                return null;
            }

            return language;
        }

        public async Task<IEnumerable<LanguageResponse>> GetLanguagesAsync()
        {
            var request = await _languageRepository.GetLanguagesAsync();

            IEnumerable<LanguageResponse> response = request.Select(l => new LanguageResponse
            {
                LanguageId = l.LanguageId,
                ShortTitle = l.ShortTitle,
                IsActive = l.IsActive
            });

            return response;
        }
    }
}
