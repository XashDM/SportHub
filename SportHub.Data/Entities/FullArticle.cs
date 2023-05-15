namespace SportHub.Data.Entities;

public class FullArticle
{
    public string ArticleId { get; set; } 
    public DateTime PublishingDate { get; set; }
    public User Author { get; set; }
    public string Category{ get; set; }
    public string Team { get; set; }
    public string Location { get; set; }
    public string ImageUrl { get; set; }

    public IEnumerable<FullArticleInfo> Infos { get; set; }
}