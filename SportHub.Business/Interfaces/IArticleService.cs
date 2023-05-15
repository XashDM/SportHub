﻿using SportHub.Data.DTO;
using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface IArticleService
	{
		Task CreateArticleAsync(Article article);
		Task<FullArticle> GetArticleAsync(string id);
		
		Task<IEnumerable<MainArticleInfo>> GetMainArticlesAsync(string language);
	}
}