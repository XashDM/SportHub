namespace SportHub.Data.Entities;

public class FullLanguageSpecificArticle
{
    public DateTime PublishingDate { get; set; }
    public string AuthorId { get; set; } = null!;
    public string SubCategory { get; set; } = null!;
    public string Team { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public bool Published { get; set; }
    public bool ShowComments { get; set; }
    public string Language { get; set; } = null!;
    public string ArticleId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Subtitle { get; set; } = null!;
    public string MainText { get; set; } = null!;
}