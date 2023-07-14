using SportHub.API.Infrastructure.Interfaces;
using Azure.Storage.Blobs;

namespace SportHub.API.Infrastructure.Services
{
	public class ImageStorageService : IImageStorageService
	{
		private readonly string _blobStorageConnectionString;
		private readonly string _blobContainerName;

		public ImageStorageService(IConfiguration config)
		{
			_blobStorageConnectionString = config.GetSection("Azure")["BlobStorageConnectionString"];
			_blobContainerName = config.GetSection("Azure")["BlobStorageContainerName"];
		}

		public async Task<string> SaveImageFile(IFormFile file)
		{
			var imageId = Guid.NewGuid().ToString();

			var fileName = imageId + Path.GetExtension(file.FileName);

			var container = new BlobContainerClient(_blobStorageConnectionString, _blobContainerName);
			var blob = container.GetBlobClient(fileName);

			await blob.UploadAsync(file.OpenReadStream());

			return fileName;
		}
	}
}
