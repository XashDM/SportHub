namespace SportHub.Data.Entities;

public class LanguageSpecificArticle
{
    public DateTime PublishingDate { get; set; }
    public string AuthorId { get; set; } = null!;
    public string SubCategoryId { get; set; } = null!;
    public string TeamId { get; set; } = null!;
    public string LocationId { get; set; } = null!;
    public string ImageId { get; set; } = null!;
    public bool Published { get; set; }
    public bool ShowComments { get; set; }
    public string LanguageId { get; set; } = null!;
    public string ArticleId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Subtitle { get; set; } = null!;
    public string MainText { get; set; } = null!;
}