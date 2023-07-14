using SportHub.Data.Entities;

namespace SportHub.Data.DTO;

public class BreakDownDetailsDTO
{
    public Category Category { get; set; } = null!;
    public SubCategory SubCategory { get; set; }
    public Team Team { get; set; }
}