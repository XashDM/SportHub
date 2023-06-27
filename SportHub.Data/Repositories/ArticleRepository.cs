using System;
using Dapper;
using SportHub.Data.Entities;
using SportHub.Data.Interfaces;

namespace SportHub.Data.Repositories;

public class ArticleRepository : IArticleRepository
{
	private readonly IDbConnectionFactory _dbConnectionFactory;
	private readonly string[] _exceptionalColumns;
	public ArticleRepository(IDbConnectionFactory dbConnectionFactory)
	{
		_dbConnectionFactory = dbConnectionFactory;
		_exceptionalColumns = new string[]{"LastArticles", "NumberOfArticles"};
	}

	public async Task CreateArticleAsync(Article article)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();

			using (var transaction = connection.BeginTransaction())
			{
				var sqlArticle =
					"INSERT INTO Articles (ArticleId, PublishingDate, AuthorId, SubCategoryId, TeamId, ImageId, LocationId, Published, ShowComments) " +
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

			var article =
				await connection.QueryFirstOrDefaultAsync<LanguageSpecificArticle>(articleQuery, new { id, language });

			return article;
		}
	}

	public async Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId,
		ArticleSearchOptions articleSearchOptions)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = $"SELECT * FROM Articles" +
			            $" LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId" +
			            $" where ArticleInfos.languageId = {languageId}";

			foreach (var property in articleSearchOptions.GetType().GetProperties())
			{
				string propertyName = property.Name;
				object? propertyValue = property.GetValue(articleSearchOptions);

				if (propertyValue != null && IsNotFilterColumn(propertyName))
				{
					query += $" and Articles.{propertyName} = {propertyValue}";
				}
			}

			if (articleSearchOptions.LastArticles != null)
			{
				query += " ORDER BY PublishingDate ";
				query += (bool)articleSearchOptions.LastArticles ? "DESC" : "ASC";
			}

			if (articleSearchOptions.NumberOfArticles != null)
			{
				query += $" LIMIT {articleSearchOptions.NumberOfArticles}";
			}

			var articles = await connection.QueryAsync<LanguageSpecificArticle>(query);

			return articles;
		}
	}

	public async Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId,
		string languageId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = @"SELECT * FROM Articles 
								LEFT JOIN `Language` ON Language.LanguageId = @languageId
								LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId AND ArticleInfos.LanguageId = Language.LanguageId
								WHERE Articles.ArticleId = @articleId;";

			var article =
				await connection.QueryFirstOrDefaultAsync<LanguageSpecificArticle>(query,
					new { articleId, languageId });

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

			var mainArticles = await connection.QueryAsync<MainArticle>(sql, new { language });

			return mainArticles;
		}
	}

	public async Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = $"SELECT * FROM MainArticle where LanguageId='{languageId}';";
			var response = await connection.QueryAsync<MainArticle>(query);

			return response;
		}
	}

	public async Task CreateMainArticlesAsync(IEnumerable<MainArticle> mainArticles)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			using (var transaction = connection.BeginTransaction())
			{
				string query;

				string languageId = mainArticles.First().LanguageId;
				await DeleteAllMainArticlesByLanguageIdAsync(languageId);

				foreach (var mainArticle in mainArticles)
				{
					query = $"INSERT INTO MainArticle(MainArticleId, ArticleId, LanguageId, `Order`)" +
					        " VALUES(@MainArticleId, @ArticleId, @LanguageId, @Order);";
					await connection.ExecuteAsync(query, mainArticle);
				}

				transaction.Commit();
			}
		}
	}

	public async Task DeleteAllMainArticlesByLanguageIdAsync(string languageId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = $"DELETE FROM MainArticle WHERE LanguageId='{languageId}';";
			await connection.ExecuteAsync(query);
		}
	}

	public async Task<IEnumerable<LanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language,
		string categoryId, int pageNumber)
	{
		var pageSize = 2;
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var offset = (pageNumber - 1) * pageSize;

			var articleQuery = @"SELECT * FROM Articles 
         						LEFT JOIN SubCategories ON SubCategories.SubCategoryId = Articles.SubCategoryId
         						LEFT JOIN `Language` ON Language.ShortTitle = @language
								LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId AND ArticleInfos.LanguageId = Language.LanguageId
								WHERE SubCategories.CategoryId = @categoryId
								ORDER BY Articles.ArticleId 
								LIMIT @pageSize 
								OFFSET @offset";

			var pageOfArticles =
				await connection.QueryAsync<LanguageSpecificArticle>(articleQuery,
					new { offset, pageSize, categoryId, language });

			return pageOfArticles;
		}
	}

	private bool IsNotFilterColumn(string propertyName)
	{
		foreach (var columnName in _exceptionalColumns)
		{
			if (propertyName == columnName)
			{
				return false;
			}
		}
		
		return true;
	}
}
