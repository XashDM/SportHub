import axios from "axios";

const SubCategoryRequest = async (id) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    const preListSubCategory = (await axios.get(`${backendHost}/SubCategory/category/${id}`))["data"]
    const SubCategoryLists = []
    for (let i of preListSubCategory){
        i.id = i.subCategoryId
        i.title = i.subCategoryName
        delete i.subCategoryId
        delete i.subCategoryName
        SubCategoryLists.push(i)
    }
    return SubCategoryLists
}


export default SubCategoryRequest