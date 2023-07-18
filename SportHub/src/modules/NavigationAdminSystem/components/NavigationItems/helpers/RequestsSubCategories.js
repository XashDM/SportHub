import extendedAxios from "../../../../../extendedAxios"

const SubCategoryRequest = async (id) => {
    const preListSubCategory = (await extendedAxios.get(`/SubCategory/category/${id}`))["data"]
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
