using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportHub.Business;
using SportHub.Business.Implementations;
using SportHub.Data.DTO;
using SportHub.Data.Entities;
using System.Reflection.Metadata.Ecma335;

namespace SportHub.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NavigationTreeController : ControllerBase
    {
        private readonly INavigationTreeService _NavigationTreeService;
        private readonly ILogger<NavigationTreeController> _logger;
        private readonly IMapper _mapper;

        public NavigationTreeController(INavigationTreeService NavigationTreeService, ILogger<NavigationTreeController> logger,IMapper mapper)
        {
            _NavigationTreeService = NavigationTreeService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateByNavigationTree([FromBody] NavigationTree navigationTree)
        {
            /* NavigationTree navigationTree = _mapper.Map<NavigationTreeDto, NavigationTree>(navigationTreeDTO);*/
            //var FirstElement = await _NavigationTreeService.CreateByNavigationTree(navigationTree);
            List<string> subCategoriesNearNewCategories = new List<string>();
            List<string> teamsNearNewSubcategories = new List<string>();

            foreach (var category  in navigationTree.Categories)
            {
                var NewCategoryId = Guid.NewGuid().ToString();
                var ListOfSubCategories = navigationTree.SubCategories.FindAll(x => x.CategoryId == category.CategoryId).ConvertAll(x => navigationTree.SubCategories.IndexOf(x));
                category.CategoryId = NewCategoryId;
                foreach (var subcategoryIndex in ListOfSubCategories)
                {
                    var NewSubCategoryId = Guid.NewGuid().ToString();
                    subCategoriesNearNewCategories.Add(NewSubCategoryId);
                    var ListOfTeams = navigationTree.Teams.FindAll(x => x.SubCategoryId == navigationTree.SubCategories[subcategoryIndex].SubCategoryId).ConvertAll(x => navigationTree.Teams.IndexOf(x));
                    navigationTree.SubCategories[subcategoryIndex].CategoryId = NewCategoryId;
                    navigationTree.SubCategories[subcategoryIndex].SubCategoryId = NewSubCategoryId;
                    foreach(var teamIndex in ListOfTeams)
                    {
                        var NewTeamId = Guid.NewGuid().ToString();
                        teamsNearNewSubcategories.Add(NewTeamId);
                        navigationTree.Teams[teamIndex].SubCategoryId = NewSubCategoryId;
                        navigationTree.Teams[teamIndex].TeamId = NewTeamId;
                    }
                }
            }
            foreach (var subcategory in navigationTree.SubCategories)
            {
                if (!subCategoriesNearNewCategories.Contains(subcategory.CategoryId))
                {
                    var NewSubCategoryId = Guid.NewGuid().ToString();
                    var ListOfTeams = navigationTree.Teams.FindAll(x => x.SubCategoryId == subcategory.SubCategoryId).ConvertAll(x => navigationTree.Teams.IndexOf(x));
                    subcategory.SubCategoryId = NewSubCategoryId;
                    foreach (var teamIndex in ListOfTeams)
                    {
                        var NewTeamId = Guid.NewGuid().ToString();
                        teamsNearNewSubcategories.Add(NewTeamId);
                        navigationTree.Teams[teamIndex].SubCategoryId = NewSubCategoryId;
                        navigationTree.Teams[teamIndex].TeamId = NewTeamId;
                    }

                }
            }
            foreach(var team in navigationTree.Teams)
            {
                if (!teamsNearNewSubcategories.Contains(team.SubCategoryId))
                {
                    var NewTeamId = Guid.NewGuid().ToString();
                    team.TeamId = NewTeamId;
                }
            }
            await _NavigationTreeService.CreateByNavigationTree(navigationTree);
            return Ok(navigationTree.Teams);
        }

    }
}