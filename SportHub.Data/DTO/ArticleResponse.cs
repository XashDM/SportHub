using SportHub.Data.Entities;

namespace SportHub.Data.DTO;

public class ArticleResponse
{
    public string ArticleId { get; set; } 
    public DateTime PublishingDate { get; set; }
    public UserResponseDto Author { get; set; }
    public string Category{ get; set; }
    public string Team { get; set; }
    public string Location { get; set; }
    public string ImageUrl { get; set; }
    public string MainText { get; set; }

    public List<ArticleInfo> Infos { get; set; }
}