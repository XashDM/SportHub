using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ITeamsService
	{
        Task<IEnumerable<Team>> GetAllTeamsAsync();

        Task<Team> GetTeamByIdAsync(string TeamId);

        Task<IEnumerable<Team>> GetTeamsBySubcategoryIdAsync(string SubCategoryId);

        Task<IEnumerable<Team>> GetTeamsByСategoryIdAsync(string сategoryId);

        Task<string> CreateTeamAsync(Team team);

        Task UpdateTeamAsync(string TeamId, TeamChangeDto teamChange);

        Task UpdateSubcategoryOfTeamAsync(string TeamId, string SubCategoryId);

        Task DeleteTeamAsync(string TeamId);
    }
}