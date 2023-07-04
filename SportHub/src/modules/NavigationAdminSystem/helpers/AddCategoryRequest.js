import axios from "axios";

const AddCategoryRequest = async (name) => {
    const body = {
        "categoryName" : name
    }
    
    const response = await axios.post("https://localhost:7168/Category",body,{
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(response)
}

export default AddCategoryRequest