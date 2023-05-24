using SportHub.Data.Entities;

namespace SportHub.Business.Interfaces;

public interface IImageService
{
    Task<Image> GetImageById(string id);
}