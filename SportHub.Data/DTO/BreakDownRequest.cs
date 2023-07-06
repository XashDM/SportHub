namespace SportHub.Data.DTO;

public class BreakDownRequest
{
    public string LanguageId { get; set; }
    public string CategoryId { get; set; }
    public string? SubCategoryId { get; set; }
    public string? TeamId { get; set; }
}