using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
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

	public async Task PostArticleAsync(Article article)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var sql = "INSERT INTO Articles (ArticleId, PublishingDate, AuthorId, SubCategoryId, TeamId, Published, ShowComments) " +
					  "VALUES (@ArticleId, @PublishingDate, @AuthorId, @SubCategoryId, @TeamId, @Published, @ShowComments)";
			await connection.ExecuteAsync(sql, article);
		}
	}

	public async Task PostArticleInfosAsync(ArticleInfo[] articleInfos)
	{
		using (var connection = _dbConnectionFactory.GetConnection())
		{
			connection.Open();
			var sql = "INSERT INTO ArticleInfos (LanguageId, ArticleId, Title, Subtitle, MainText) " +
					  "VALUES (@LanguageId, @ArticleId, @Title, @Subtitle, @MainText)";
			foreach(var el in articleInfos)
			{
				await connection.ExecuteAsync(sql, el);
			}
		}
	}
}