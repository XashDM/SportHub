namespace SportHub.Data.Entities;

public class MainArticle
{
    public string MainArticleId { get; set; } = null!;
    public string ArticleId { get; set; } = null!;
    public string LanguageId { get; set; } = null!;
    public int Order { get; set; }
}