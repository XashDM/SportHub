using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces
{
    public interface ITeamsRepository
    {
        Task<IEnumerable<Team>> GetAllTeamsAsync();

        Task<Team> GetTeamByIdAsync(string TeamId);

        Task<IEnumerable<Team>> GetTeamsBySubcategoryIdAsync(string SubCategoryId);

        Task<string> CreateTeamAsync(Team team);

        Task UpdateTeamAsync(string TeamId, TeamChangeDto teamChange);

        Task UpdateSubcategoryOfTeamAsync(string TeamId, string SubCategoryId);

        Task DeleteTeamAsync(string TeamId);
    }
}