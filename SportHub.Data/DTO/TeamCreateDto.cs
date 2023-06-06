namespace SportHub.Data.DTO
{
    public class TeamCreateDto
    {
        public string TeamName { get; set; } = null!;
        public string TeamDescription { get; set; } = null!;
        public string SubCategoryId { get; set; } = null!;
    }
}
