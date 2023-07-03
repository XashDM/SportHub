namespace SportHub.Data.Entities;

public class Article
{
	public string ArticleId { get; set; }
	public DateTime PublishingDate { get; set; }
	public string AuthorId { get; set; } = null!;
	public string CategoryId { get; set; } = null!;
	public string SubCategoryId { get; set; }
	public string TeamId { get; set; }
	public string LocationId { get; set; }
	public string ImageId { get; set; }
	public bool Published { get; set; }
	public bool ShowComments { get; set; }
	public List<ArticleInfo> Infos { get; set; } = null!;
}