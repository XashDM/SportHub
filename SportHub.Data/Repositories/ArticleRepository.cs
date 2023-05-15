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

	public async Task<FullArticle> GetArticleAsync(string id)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var articleQuery = @"SELECT 
                        a.ArticleId, 
                        a.PublishingDate, 
                        u.*, 
                        c.CategoryName, 
                        t.TeamName, 
                        l.LocationName, 
                        i.Image
                    FROM Articles a
                    LEFT JOIN User u ON a.AuthorId = u.UserId
                    LEFT JOIN SubCategories sc ON a.SubCategoryId = sc.SubCategoryId
					LEFT JOIN Categories c ON sc.CategoryId = c.CategoryId
                    LEFT JOIN Teams t ON a.TeamId = t.TeamId
                    LEFT JOIN Locations l ON a.LocationId = l.LocationId
                    LEFT JOIN Images i ON a.ImageId = i.ImageId

                    WHERE a.ArticleId = @id;";

			var articles = await connection
				.QueryAsync<FullArticle, User, string, string, string, string,  FullArticle>(
					sql: articleQuery,
					map: (a, u, cat, team, loc, img) =>
					{
						a.Author = u;
						a.Category = cat;
						a.Team = team;
						a.Location = loc;
						a.ImageUrl = img;
						
						return a;
					},
					param: new { id },
					splitOn: "UserId,CategoryName,TeamName,LocationName,Image"
				);

			var article = articles.FirstOrDefault();
			
			if (article == null)
			{
				return null;
			}
			
			var articleInfoQuery = @"SELECT 
                        ai.ArticleId,
                        ai.Title,
                        ai.SubTitle,
                        ai.MainText,
                        lang.ShortTitle as Language
                    FROM ArticleInfos ai
                    LEFT JOIN Language lang ON ai.LanguageId = lang.LanguageId

                    WHERE ai.ArticleId = @id;";
			
			var articleInfos = await connection
				.QueryAsync<FullArticleInfo>(articleInfoQuery, new { id });
			
			article.Infos = articleInfos;
			
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

}