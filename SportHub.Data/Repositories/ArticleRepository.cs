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

			using (var tran = connection.BeginTransaction())
			{
				var sqlArticle = "INSERT INTO Articles (ArticleId, PublishingDate, AuthorId, SubCategoryId, TeamId, Published, ShowComments) " +
				"VALUES (@ArticleId, @PublishingDate, @AuthorId, @SubCategoryId, @TeamId, @Published, @ShowComments)";
				var sqlInfos = "INSERT INTO ArticleInfos (LanguageId, ArticleId, Title, Subtitle, MainText) " +
					  "VALUES (@LanguageId, @ArticleId, @Title, @Subtitle, @MainText)";

				await connection.ExecuteAsync(sqlArticle, article, tran);
				await connection.ExecuteAsync(sqlInfos, article.Infos, tran);

				tran.Commit();
			}
		}
	}
}