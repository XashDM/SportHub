using SportHub.Data.Entities;

namespace SportHub.Data.Entities;


public class NavigationTree
{
    public List<Category> Categories { get; set; }  
    public List<SubCategory> SubCategories { get; set; }
    public List<Team> Teams { get; set; }
}