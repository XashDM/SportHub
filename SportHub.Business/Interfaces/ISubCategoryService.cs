﻿using SportHub.Data.Entities;

namespace SportHub.Business
{
	public interface ISubCategoryService
	{
		Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();
	}
}