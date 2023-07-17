import extendedAxios from "../../../../../../../../extendedAxios"

export default class Requests{
    async getSubCategories(categoryId){
        try {
            const response = await extendedAxios.get(`/SubCategory/category/` + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getTeamBySubCategoryId(subCategoryId){
        try {
            const response = await extendedAxios.get(`/Teams/subcategory/` + subCategoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getTeamsByCategoryId(categoryId){
        try {
            const response = await extendedAxios.get(`/Teams/category/` + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }
    async getArticleByLanguageIdAndCategoryId(languageId, categoryId)  {
        try {
            const response = await extendedAxios.get(`/AllArticlesByFilters?languageId=${languageId}&categoryId=${categoryId}`)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getArticleByLanguageIdAndSubCategoryId(languageId, subCategoryId) {
        try {
            const response = await extendedAxios.get(`/AllArticlesByFilters?languageId=${languageId}&subCategoryId=${subCategoryId}`)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getArticleByLanguageIdAndTeamId(languageId, teamId) {
        try {
            const response = await extendedAxios.get(`/AllArticlesByFilters?languageId=${languageId}&teamId=${teamId}`);
            return response.data
        } catch (error) {
            return error.code
        }
    }

}
