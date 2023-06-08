namespace SportHub.Data.Entities;

public class ArticleInfoCreateDto
{
	public string LanguageId { get; set; } = null!;
	public string Title { get; set; } = null!;
	public string Subtitle { get; set; } = null!;
	public string MainText { get; set; } = null!;
}
