using System.Net;
using System.Threading.Tasks;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc.Testing;
using SportHub.API;

namespace SportHub.IntegrationTests
{
    [TestFixture]
    public class ArticleControllerTests
    {
        private WebApplicationFactory<Program> _factory;
        private HttpClient _client;

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            _factory = new WebApplicationFactory<Program>();
            _client = _factory.CreateClient();
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            _client.Dispose();
            _factory.Dispose();
        }

        [Test]
        [TestCase("en","1", 1)]
        public async Task CorrectCategory_SearchingForArticles_PackOfArticlesReturned(string language, string categoryId, int pageNumber)
        {
            // Arrange
            var requestUri = $"/article/GetPageOfArticlesByCategory?language={language}&categoryId={categoryId}&pageNumber={pageNumber}";

            // Act
            var response = await _client.GetAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }
        
        [Test]
        public async Task GetArticleByIdAndLanguage_ReturnsOkResponse()
        {
            // Arrange
            var articleId = "1";
            var languageId = "1";

            // Act
            var response = await _client.GetAsync($"/Article/?id={articleId}&language={languageId}");

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

    }
}