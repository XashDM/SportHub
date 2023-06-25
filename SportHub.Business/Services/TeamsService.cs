using SportHub.Data.DTO;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;
using SportHub.Data.Repositories;

namespace SportHub.Business.Implementations
{
    public class TeamsService : ITeamsService
    {
        private readonly ITeamsRepository _TeamsRepository;

        public TeamsService(ITeamsRepository TeamsService)
        {
            _TeamsRepository = TeamsService;
        }

        public async Task<IEnumerable<Team>> GetAllTeamsAsync()
        {
            return await _TeamsRepository.GetAllTeamsAsync();
        }

        public async Task<Team> GetTeamByIdAsync(string TeamId)
        {
            return await _TeamsRepository.GetTeamByIdAsync(TeamId);
        }

        public async Task<IEnumerable<Team>> GetTeamsBySubcategoryIdAsync(string SubCategoryId)
        {
            return await _TeamsRepository.GetTeamsBySubcategoryIdAsync(SubCategoryId);
        }
        
        public async Task<IEnumerable<Team>> GetTeamsByСategoryIdAsync(string сategoryId)
        {
            return await _TeamsRepository.GetTeamsByCategoryIdAsync(сategoryId);
        }
        
        public async Task<string> CreateTeamAsync(Team team)
        {
            return await _TeamsRepository.CreateTeamAsync(team);
        }

        public async Task UpdateTeamAsync(string TeamId, TeamChangeDto teamChange)
        {
            await _TeamsRepository.UpdateTeamAsync(TeamId, teamChange);
        }

        public async Task UpdateSubcategoryOfTeamAsync(string TeamId, string SubCategoryId)
        {
            await _TeamsRepository.UpdateSubcategoryOfTeamAsync(TeamId,SubCategoryId);
        }

        public async Task DeleteTeamAsync(string TeamId)
        {
            await _TeamsRepository.DeleteTeamAsync(TeamId);
        }
    }
}