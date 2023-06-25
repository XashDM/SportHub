namespace SportHub.API.Infrastructure.Interfaces
{
	public interface IImageStorageService
	{
		Task<string> SaveImageFile(IFormFile file);
	}
}