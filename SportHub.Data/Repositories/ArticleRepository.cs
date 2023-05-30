using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class ArticleRepository : IArticleRepository
{
	private readonly IDbConnectionFactory _dbConnectionFactory;

	public ArticleRepository(IDbConnectionFactory dbConnectionFactory)
	{
		_dbConnectionFactory = dbConnectionFactory;
	}

	public async Task CreateArticleAsync(Article article)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();

			using (var transaction = connection.BeginTransaction())
			{
				var sqlArticle = "INSERT INTO Articles (ArticleId, PublishingDate, AuthorId, SubCategoryId, TeamId, ImageId, LocationId, Published, ShowComments) " +
				"VALUES (@ArticleId, @PublishingDate, @AuthorId, @SubCategoryId, @TeamId, @ImageId, @LocationId, @Published, @ShowComments)";
				var sqlInfos = "INSERT INTO ArticleInfos (LanguageId, ArticleId, Title, Subtitle, MainText) " +
					  "VALUES (@LanguageId, @ArticleId, @Title, @Subtitle, @MainText)";

				await connection.ExecuteAsync(sqlArticle, article, transaction);
				await connection.ExecuteAsync(sqlInfos, article.Infos, transaction);

				transaction.Commit();
			}
		}
	}

	public async Task<LanguageSpecificArticle> GetArticleByIdAndLanguageAsync(string id, string language)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var articleQuery = @"SELECT * FROM Articles 
								LEFT JOIN `Language` ON Language.ShortTitle = @language
								LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId AND ArticleInfos.LanguageId = Language.LanguageId
								WHERE Articles.ArticleId = @id;";

			var article = await connection.QueryFirstOrDefaultAsync<LanguageSpecificArticle>(articleQuery, new {id, language});
			
			return article;
		}
	}
	
	public async Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var getArticleByArticleIdAndLanguageIdSql = @"SELECT * FROM Articles 
								LEFT JOIN `Language` ON Language.LanguageId = @languageId
								LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId AND ArticleInfos.LanguageId = Language.LanguageId
								WHERE Articles.ArticleId = @articleId;";

			var article = await connection.QueryFirstOrDefaultAsync<LanguageSpecificArticle>(getArticleByArticleIdAndLanguageIdSql, new {articleId, languageId});
			
			return article;
		}
	}
	public async Task<IEnumerable<MainArticle>> GetMainArticlesAsync(string language)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var sql = @"SELECT MainArticle.* FROM MainArticle 
						LEFT JOIN Language langTable ON langTable.ShortTitle = @language
						WHERE MainArticle.LanguageId = langTable.LanguageId";
			
			var mainArticles = await connection.QueryAsync<MainArticle>(sql, new {language});

			return mainArticles;
		}
	}

	public async Task<IEnumerable<Article>> GetArticlesByLanguageIdAndPropertyIdAsync(string languageId, string propertyIdName, string propertyId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			
			var getArticlesByCategory = $"SELECT * FROM articles where {propertyIdName} = {propertyId}";
			List<Article> articles = (await connection.QueryAsync<Article>(getArticlesByCategory, new {propertyIdName, propertyId})).ToList();

			for (int articleCount = 0; articleCount < articles.Count(); articleCount++)
			{
				string articleId = articles[articleCount].ArticleId;
				var getArticlesInfoByLanguageId = $"SELECT * FROM articleinfos WHERE ArticleId = {articleId} AND LanguageId = {languageId}";
				articles[articleCount].Infos = (await connection.QueryAsync<ArticleInfo>(getArticlesInfoByLanguageId)).ToList();
			}
			
			return articles.AsEnumerable();
		}
	}
	
}