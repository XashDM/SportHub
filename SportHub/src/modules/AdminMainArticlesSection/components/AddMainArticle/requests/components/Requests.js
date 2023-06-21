import axios from "axios"

export default class Requests{
    backendHost = process.env.REACT_APP_BACKEND_HOST

    async getSubCategories(categoryId){
        try {
            const response = await axios.get(`${this.backendHost}/SubCategory/category/` + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getTeamBySubCategoryId(subCategoryId){
        try {
            const response = await axios.get(`${this.backendHost}/Teams/subcategory/` + subCategoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getTeamsByCategoryId(categoryId){
        try {
            const response = await axios.get(`${this.backendHost}/Teams/category/` + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }
    async getArticleByLanguageIdAndCategoryId(languageId, categoryId)  {
        try {
            const response = await axios.get(`${this.backendHost}/AllArticlesByFilters?languageId=${languageId}&categoryId=${categoryId}`)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getArticleByLanguageIdAndSubCategoryId(languageId, subCategoryId) {
        try {
            const response = await axios.get(`${this.backendHost}/AllArticlesByFilters?languageId=${languageId}&subCategoryId=${subCategoryId}`)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getArticleByLanguageIdAndTeamId(languageId, teamId) {
        try {
            const response = await axios.get(`${this.backendHost}/AllArticlesByFilters?languageId=${languageId}&teamId=${teamId}`);
            return response.data
        } catch (error) {
            return error.code
        }
    }

}
