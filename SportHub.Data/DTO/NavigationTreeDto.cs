using SportHub.Data.DTO;

namespace SportHub.Data.DTO
{
    public class NavigationTreeDto
    {
        public Dictionary<CategoryCreateDto, List<SubCategoryCreateDto>> MainTree { get; set; }
    }
}
