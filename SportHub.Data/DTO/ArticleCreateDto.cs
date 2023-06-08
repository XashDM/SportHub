namespace SportHub.Data.Entities;

public class ArticleCreateDto
{
	public string AuthorId { get; set; } = null!;
	public string SubCategoryId { get; set; }
	public string TeamId { get; set; }
	public string LocationId { get; set; }
	public bool ShowComments { get; set; }
	public List<ArticleInfoCreateDto> Infos { get; set; } = null!;
}