using SportHub.Business.Interfaces;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Business.Services;

public class ImageService : IImageService
{
    private readonly IImageRepository _imageRepository;
    
    public ImageService(IImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }
    
    public async Task<Image> GetImageById(string id)
    {
        var image = await _imageRepository.GetImageById(id);

        return image;
    }
}