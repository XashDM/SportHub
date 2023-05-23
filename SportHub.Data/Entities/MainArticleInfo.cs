using SportHub.Data.Entities;

namespace SportHub.Data.DTO;

public class MainArticleInfo
{
    public DateTime PublishingDate { get; set; }
    public string Category{ get; set; }
    public string ImageUrl { get; set; }
    public string ArticleId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Subtitle { get; set; } = null!;
    public string MainText { get; set; } = null!;
}