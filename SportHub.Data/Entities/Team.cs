namespace SportHub.Data.Entities;

public class Team
{
    public string TeamId { get; set; } = null!;
    public string TeamName { get; set; } = null!;
    public string TeamDescription { get; set; } = null!;
    public string SubCategoryId { get; set; } = null!;
    public bool isHidden { get; set; }
}