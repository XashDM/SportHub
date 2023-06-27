using System.Collections.Generic;
using System.IO.Enumeration;
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

	public async Task CreateArticleAsync(Article article, Image image)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();

			using (var transaction = connection.BeginTransaction())
			{
				var sqlImage = "INSERT INTO Images (ImageId, Url, Alt) " +
					  "VALUES (@ImageId, @Url, @Alt)";
				var sqlArticle = "INSERT INTO Articles (ArticleId, PublishingDate, AuthorId, CategoryId, SubCategoryId, TeamId, ImageId, LocationId, Published, ShowComments) " +
				"VALUES (@ArticleId, @PublishingDate, @AuthorId, @CategoryId, @SubCategoryId, @TeamId, @ImageId, @LocationId, @Published, @ShowComments)";
				var sqlInfos = "INSERT INTO ArticleInfos (LanguageId, ArticleId, Title, Subtitle, MainText) " +
					  "VALUES (@LanguageId, @ArticleId, @Title, @Subtitle, @MainText)";
				await connection.ExecuteAsync(sqlImage, image, transaction);
				await connection.ExecuteAsync(sqlArticle, article, transaction);
				await connection.ExecuteAsync(sqlInfos, article.Infos, transaction);

				transaction.Commit();
			}
		}
	}

	public async Task UpdateArticleAsync(Article article, Image image)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();

			using (var transaction = connection.BeginTransaction())
			{
				var sqlImage = "INSERT INTO Images (ImageId, Url, Alt) VALUES (@ImageId, @Url, @Alt)";
				var sqlArticle = "UPDATE Articles SET PublishingDate = @PublishingDate, AuthorId = @AuthorId, CategoryId = @CategoryId, " +
					"SubCategoryId = @SubCategoryId, TeamId = @TeamId, ImageId = @ImageId, LocationId = @LocationId, Published = @Published, " +
					"ShowComments = @ShowComments WHERE ArticleId = @ArticleId";

				var sqlInfosUpdate = "UPDATE ArticleInfos SET Title = @Title, Subtitle = @Subtitle, MainText = @MainText " +
					 "WHERE LanguageId = @LanguageId AND ArticleId = @ArticleId";

				var sqlInfosCreate = "INSERT INTO ArticleInfos (LanguageId, ArticleId, Title, Subtitle, MainText) " +
					  "VALUES (@LanguageId, @ArticleId, @Title, @Subtitle, @MainText)";

				var sqlInfosFind = $"SELECT LanguageId FROM articleinfos WHERE ArticleId = '{article.ArticleId}'";

				var languageIds = new List<string>(await connection.QueryAsync<string>(sqlInfosFind, transaction));

				await connection.ExecuteAsync(sqlImage, image, transaction);

				await connection.ExecuteAsync(sqlArticle, article, transaction);

				foreach (ArticleInfo info in article.Infos)
				{
					if (languageIds.Contains(info.LanguageId))
					{
						await connection.ExecuteAsync(sqlInfosUpdate, info, transaction);
					}
					else
					{
						await connection.ExecuteAsync(sqlInfosCreate, info, transaction);
					}
				}

				transaction.Commit();
			}
		}
	}

	public async Task<Article> GetArticleByIdAsync(string articleId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var articleQuery = "SELECT * FROM Articles " +
								$"WHERE ArticleId = '{articleId}';";
			var articleInfoQuery = "SELECT * FROM ArticleInfos " +
								$"WHERE ArticleId = '{articleId}';";

			var article = await connection.QueryFirstOrDefaultAsync<Article>(articleQuery);

			if (article != null)
			{
				var articleInfos = await connection.QueryAsync<ArticleInfo>(articleInfoQuery);
				article.Infos = new List<ArticleInfo>(articleInfos);
			}

			return article;
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
	
	public async Task<IEnumerable<LanguageSpecificArticle>> GetAllArticlesByFiltersAsync(string languageId, ArticleSearchOptions articleSearchOptions)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = $"SELECT * FROM Articles" +
			            $" LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId" +
			            $" where ArticleInfos.languageId = {languageId}";
			
			foreach (var property in articleSearchOptions.GetType().GetProperties())
			{
				if (property.GetValue(articleSearchOptions) != null)
				{
					query += $" and Articles.{property.Name} = {property.GetValue(articleSearchOptions)}";
				}
			}

			var articles = await connection.QueryAsync<LanguageSpecificArticle>(query);
			
			return articles;
		}
	}
	
	public async Task<LanguageSpecificArticle> GetArticleByArticleIdAndLanguageIdAsync(string articleId, string languageId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = @"SELECT * FROM Articles 
								LEFT JOIN `Language` ON Language.LanguageId = @languageId
								LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId AND ArticleInfos.LanguageId = Language.LanguageId
								WHERE Articles.ArticleId = @articleId;";

			var article = await connection.QueryFirstOrDefaultAsync<LanguageSpecificArticle>(query, new {articleId, languageId});
			
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
	
	public async Task<IEnumerable<MainArticle>> GetMainArticlesByLanguageIdAsync(string languageId)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var query = $"SELECT * FROM MainArticles where LanguageId='{languageId}';";
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
					query = $"INSERT INTO MainArticles(MainArticleId, ArticleId, LanguageId, `Order`)" +
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
			var query = $"DELETE FROM MainArticles WHERE LanguageId='{languageId}';";
			await connection.ExecuteAsync(query);
		}
	}

	public async Task<IEnumerable<LanguageSpecificArticle>> GetPageOfArticlesByCategoryAsync(string language, string categoryId, int pageNumber)
	{
		var pageSize = 2;
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			
			var articleQuery = @"SELECT * FROM Articles 
         						LEFT JOIN SubCategories ON SubCategories.SubCategoryId = Articles.SubCategoryId
         						LEFT JOIN `Language` ON Language.ShortTitle = @language
								LEFT JOIN ArticleInfos ON Articles.ArticleId = ArticleInfos.ArticleId AND ArticleInfos.LanguageId = Language.LanguageId
								WHERE SubCategories.CategoryId = @categoryId
								ORDER BY Articles.PublishingDate DESC";

			articleQuery = await PaginateQuery(articleQuery, pageNumber, pageSize);
			var pageOfArticles = await connection.QueryAsync<LanguageSpecificArticle>(articleQuery, new { categoryId, language });

			return pageOfArticles;
		}
	}

	public async Task<IEnumerable<LanguageSpecificArticle>> GetPageOfSearchArticlesAsync(string language, string findText, int pageNumber, int pageSize)
	{
		findText = '%' + findText + '%';
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var articleQuery = @"SELECT * FROM Articles a 
								JOIN ArticleInfos ai ON a.ArticleId = ai.ArticleId 
								JOIN Categories c ON a.CategoryId = c.CategoryId 
								JOIN Subcategories sc ON a.SubCategoryId = sc.SubCategoryId 
								JOIN Teams t ON a.TeamId = t.TeamId 
								JOIN Language l ON ai.LanguageId = l.LanguageId 
								WHERE (
									ai.MainText LIKE @findText 
									OR ai.Title LIKE @findText
									OR ai.SubTitle LIKE @findText
									OR c.CategoryName LIKE @findText 
									OR sc.SubCategoryName LIKE @findText 
									OR t.TeamName LIKE @findText
								) AND l.shortTitle = @language
								AND a.Published = true
								ORDER BY a.PublishingDate DESC";

			articleQuery = await PaginateQuery(articleQuery, pageNumber, pageSize);
			var pageOfArticles = await connection.QueryAsync<LanguageSpecificArticle>(articleQuery, new { findText, language });
			return pageOfArticles;
		}
	}

    private async Task<string> PaginateQuery(string query, int pageNumber, int pageSize)
	{
        var offset = (pageNumber - 1) * pageSize;
        var paginatedQuery = query + $" LIMIT {pageSize} OFFSET {offset}";
        return paginatedQuery;
    }
}