namespace SportHub.Data.Entities;

public class ArticleSearchOptions
{
    public string ArticleId { get; set; } = null!;
    public string AuthorId { get; set; } = null!;
    public string CategoryId { get; set; } = null!;
    public string SubCategoryId { get; set; } = null!;
    public string TeamId { get; set; } = null!;
    public string LocationId { get; set; } = null!;
    public bool? Published { get; set; }
    public bool? ShowComments { get; set; }
}