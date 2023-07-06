namespace SportHub.Data.Entities;

public class BreakDown
{
    public string BreakDownId { get; set; } = null!;
    public string LanguageId { get; set; } = null!;
    public string CategoryId { get; set; } = null!;
    public string? SubCategoryId { get; set; }
    public string? TeamId { get; set; }
}