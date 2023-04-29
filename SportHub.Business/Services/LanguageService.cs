﻿using SportHub.Data.Entities;
using SportHub.Data.DTO;
using SportHub.Data.Interfaces;
using SportHub.Business.Interfaces;

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
            if (shortTitle == "en")
                return;
            await _languageRepository.DeleteLanguageAsync(shortTitle);
        }

        public async Task AddLanguageAsync(LanguageRequest languageRequest)
        {
            Language language = new Language
            {
                ShortTitle = languageRequest.ShortTitle,
                IsActive = languageRequest.IsActive
            };

            await _languageRepository.AddLanguageAsync(language);
        }

        public async Task ChangeLanguageIsActiveAsync(string shortTitle, bool isActive)
        {
            if (shortTitle == "en")
                return;
            await _languageRepository.ChangeLanguageIsActiveAsync(shortTitle, isActive);
        }

        public async Task<Language> GetLanguageByTitleAsync(string shortTitle)
        {
            var language = await _languageRepository.GetLanguageByTitleAsync(shortTitle);

            return language;
        }

        public async Task<IEnumerable<Language>> GetLanguagesAsync()
        {
            var languages = await _languageRepository.GetLanguagesAsync();

            return languages;
        }
    }
}
