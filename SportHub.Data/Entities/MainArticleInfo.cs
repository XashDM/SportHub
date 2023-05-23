using SportHub.Data.Entities;

namespace SportHub.Data.DTO;

public class MainArticleInfo : ArticleInfo
{
    public DateTime PublishingDate { get; set; }
    public string Category{ get; set; }
    public string ImageUrl { get; set; }
}