using SportHub.Data.Entities;

namespace SportHub.Data.DTO;

public class BreakDownResponse
{
    public string? GroupName { get; set; }
    public IEnumerable<FullLanguageSpecificArticle> Articles { get; set; }
}