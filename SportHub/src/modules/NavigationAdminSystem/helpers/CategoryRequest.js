import extendedAxios from "../../../extendedAxios"

const CategoryRequest = async () => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    const preListCategory = (await extendedAxios.get(`/Category/all`))["data"]
    const ListCategory = []
    for (let i of preListCategory){
        i.id = i.categoryId
        i.title = i.categoryName
        delete i.categoryId
        delete i.categoryName
        ListCategory.push(i)
    }

    return ListCategory
}


export default CategoryRequest
