using SportHub.API.Infrastructure.Interfaces;

namespace SportHub.API.Infrastructure.Services
{
	public class ImageStorageService : IImageStorageService
	{
		public async Task<string> SaveImageFile(IFormFile file)
		{
			var imageId = Guid.NewGuid().ToString();

			var fileName = imageId + Path.GetExtension(file.FileName);
			var parentPath = Directory.GetParent(Directory.GetCurrentDirectory());
			var filePath = Path.Combine(parentPath.FullName, "SportHub\\public\\saved_images", fileName);

			using (var stream = new FileStream(filePath, FileMode.CreateNew))
			{
				await file.CopyToAsync(stream);
			}

			return fileName;
		}
	}
}
