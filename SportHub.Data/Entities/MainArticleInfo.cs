using SportHub.Data.Entities;

namespace SportHub.Data.DTO;

public class MainArticleInfo
{
    public string ArticleId { get; set; } 
    public DateTime PublishingDate { get; set; }
    public string Category{ get; set; }
    public string ImageUrl { get; set; }

    public FullArticleInfo Info { get; set; }
}