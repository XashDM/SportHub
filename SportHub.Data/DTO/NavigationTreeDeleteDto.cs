namespace SportHub.Data.DTO
{
    public class NavigationTreeDeleteDTO
    {
        public List<string> Categories { get; set; } = null!;
        public List<string> SubCategories { get; set; } = null!;
        public List<string> Teams { get; set; } = null!;
    }
}
