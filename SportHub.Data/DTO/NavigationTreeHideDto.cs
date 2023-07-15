namespace SportHub.Data.DTO
{
    public class NavigationTreeHideDTO
    {
        public List<HideItem> Categories { get; set; } = null!;
        public List<HideItem> SubCategories { get; set; } = null!;
        public List<HideItem> Teams { get; set; } = null!;
    }

    public class HideItem
    {
        public string id { get; set; } = null!;
        public bool isHidden { get; set; }
    }
}
