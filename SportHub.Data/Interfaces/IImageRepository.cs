using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces;

public interface IImageRepository
{
	Task<Image> GetImageById(string id);
	Task CreateImageAsync(Image image);
	Task UpdateImageAsync(Image image);
	Task<bool> ImageExists(string id);
}