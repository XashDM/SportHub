import axios from "axios";

const CategoryRequest = async () => {
    const preListCategory = (await axios.get("https://localhost:7168/Category/all"))["data"]
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