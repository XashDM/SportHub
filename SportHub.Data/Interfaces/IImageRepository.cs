using SportHub.Data.Entities;

namespace SportHub.Data.Interfaces;

public interface IImageRepository
{
    Task<Image> GetImageById(string id);
}