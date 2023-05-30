namespace SportHub.Data.Entities;

public class ArticleForMainArticleForm
{
    public string ArticleId { get; set; } = null!;
    public string Title { get; set; } = null!;
    
    public string CategoryId { get; set; } = null!;
    public string CategoryName { get; set; } = null!;
    
    public string SubCategoryId { get; set; } = null!;
    public string SubCategoryName { get; set; } = null!;
    
    public string TeamId { get; set; } = null!;
    public string TeamName { get; set; } = null!;
    
    public int Order { get; set; }
}