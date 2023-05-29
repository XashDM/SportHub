import axios from "axios";

const SubCategoryRequest = async (id) => {
    const preListSubCategory = (await axios.get(`https://localhost:7168/SubCategory/category/${id}`))["data"]
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