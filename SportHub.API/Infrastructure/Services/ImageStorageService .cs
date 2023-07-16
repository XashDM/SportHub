using SportHub.API.Infrastructure.Interfaces;
using Azure.Storage.Blobs;

namespace SportHub.API.Infrastructure.Services
{
	public class ImageStorageService : IImageStorageService
	{
		private readonly string _blobStorageConnectionString;
		private readonly string _blobContainerName;
		private readonly string _azureUrl;


		public ImageStorageService(IConfiguration config)
		{
			_blobStorageConnectionString = config.GetSection("Azure")["BlobStorageConnectionString"];
			_blobContainerName = config.GetSection("Azure")["BlobStorageContainerName"];
			_azureUrl = config.GetSection("Azure")["Url"];
		}

		public async Task<string> SaveImageFile(IFormFile file)
		{
			var imageId = Guid.NewGuid().ToString();

			var container = new BlobContainerClient(_blobStorageConnectionString, _blobContainerName);
			var blob = container.GetBlobClient(imageId);

			await blob.UploadAsync(file.OpenReadStream());
			var url = _azureUrl + _blobContainerName + "/" + imageId;
			return url;
		}
	}
}
