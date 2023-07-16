using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces;

public interface IBreakDownRepository
{ 
    Task CreateBreakDownsAsync(string languageId, IEnumerable<BreakDown> breakDowns);
    Task DeleteAllBreakDownsAsync(string languageId);
    Task<IEnumerable<BreakDown>> GetBreakDownsByLanguageIdAsync(string languageId);
    Task<IEnumerable<BreakDown>> GetBreakDownsByLanguageAsync(string language);
}