using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using SportHub.API;
using SportHub.Data.Entities;

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
        [TestCase("en","2", 1)]
        [TestCase("en","2", 2)]
        [TestCase("ua","1", 1)]
        public async Task CorrectCategory_SearchingForArticles_PackOfArticlesReturned(string language, string categoryId, int pageNumber)
        {
            // Arrange
            var requestUri = $"/article/GetPageOfArticlesByCategory?language={language}&categoryId={categoryId}&pageNumber={pageNumber}";

            // Act
            var response = await _client.GetAsync(requestUri);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            
            var responseContent = await response.Content.ReadAsStringAsync();
            var articles = JsonConvert.DeserializeObject<List<FullLanguageSpecificArticle>>(responseContent);
            
            Assert.IsNotNull(articles);
            Assert.IsInstanceOf<List<FullLanguageSpecificArticle>>(articles);
            Assert.IsTrue(articles.Count > 0);
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