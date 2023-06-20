using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces;

public interface IBreakDownRepository
{ 
    Task CreateBreakDownsAsync(IEnumerable<BreakDown> breakDowns);
    Task DeleteAllBreakDownsAsync(string languageId);
    Task<IEnumerable<BreakDown>> GetBreakDownsAsync(string languageId);
}