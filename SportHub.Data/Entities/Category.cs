namespace SportHub.Data.Entities;

public class Category
{
    public string CategoryId { get; set; } = null!;
    public string CategoryName { get; set; } = null!;
    public bool isHidden { get; set; }
}