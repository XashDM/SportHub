namespace SportHub.Data.Entities;

public class FullLanguageSpecificArticle
{
    public DateTime PublishingDate { get; set; }
    public string AuthorId { get; set; } = null!;
    public SubCategory SubCategory { get; set; } = null!;
    public Category Category { get; set; } = null!;
    public Team Team { get; set; } = null!;
    public Location Location { get; set; } = null!;
    public Image Image { get; set; } = null!;
    public bool Published { get; set; }
    public bool ShowComments { get; set; }
    public string Language { get; set; } = null!;
    public string ArticleId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Subtitle { get; set; } = null!;
    public string MainText { get; set; } = null!;
}