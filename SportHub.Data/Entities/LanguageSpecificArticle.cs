namespace SportHub.Data.Entities;

public class LanguageSpecificArticle : ArticleInfo
{
    public DateTime PublishingDate { get; set; }
    public string AuthorId { get; set; } = null!;
    public string SubCategoryId { get; set; } = null!;
    public string TeamId { get; set; } = null!;
    public string LocationId { get; set; } = null!;
    public string ImageId { get; set; } = null!;
    public bool Published { get; set; }
    public bool ShowComments { get; set; }
}