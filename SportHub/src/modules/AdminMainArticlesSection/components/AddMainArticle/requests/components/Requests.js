import axios from "axios"

export default class Requests{

    async getSubCategories(categoryId){
        try {
            const response = await axios.get('https://localhost:7168/SubCategory/category/' + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getTeamBySubCategoryId(subCategoryId){
        try {
            const response = await axios.get('https://localhost:7168/Teams/subcategory/' + subCategoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getTeamsByCategoryId(categoryId){
        try {
            const response = await axios.get('https://localhost:7168/Teams/category/' + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }
    async getArticleByLanguageIdAndCategoryId(languageId, categoryId)  {
        try {
            const response = await axios.get("https://localhost:7168/GetArticleByLanguageIdAndCategoryId?languageId="+ languageId + "&categoryId=" + categoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getArticleByLanguageIdAndSubCategoryId(languageId, subCategoryId) {
        try {
            const response = await axios.get("https://localhost:7168/GetArticleByLanguageIdAndSubCategoryId?languageId="+ languageId + "&subCategoryId=" + subCategoryId)
            return response.data
        } catch (error) {
            return error.code
        }
    }

    async getArticleByLanguageIdAndTeamId(languageId, teamId) {
        try {
            const response = await axios.get("https://localhost:7168/GetArticleByLanguageIdAndTeamId?languageId="+ languageId + "&teamId=" + teamId);
            return response.data
        } catch (error) {
            return error.code
        }
    }

}