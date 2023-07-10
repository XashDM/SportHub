import axios from "axios";
import { useNavigationItemsCategories,useNavigationItemsSubCategories,useNavigationItemsTeams } from "../../../store/useNavigationTreeStore";

const SendNavigationTreeRequest = async (Categories,SubCategories,Teams) => {
    const body = {
        "categories" : Categories,
        "subcategories" : SubCategories,
        "teams" : Teams
    }
    console.log(body)
    if (Categories.length!=0 || SubCategories.length!=0 || Teams.length!=0){
        const response = await axios.post("https://localhost:7168/NavigationTree/create",body,{
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    console.log(response)
    }
}

const SendNavigationTree = async () => {
    const categories = useNavigationItemsCategories.getState().categories
    const subCategories = useNavigationItemsSubCategories.getState().subcategories
    const teams = useNavigationItemsTeams.getState().teams
    const NewCategories = []
    for (let category of categories){
        if (category["new"] == true){
            const data = {
                "categoryId" : category["id"],
                "categoryName" :  category["title"]
            }
            NewCategories.push(data)
        }
    }
    useNavigationItemsCategories.getState().clearNew()
    const NewSubCategories = []
    for (let category in subCategories){
        for(let subcategory of subCategories[category]){
            if(subcategory["new"] == true){
                const data = {
                    "subCategoryId" : subcategory["id"],
                    "subCategoryName" : subcategory["title"],
                    "categoryId" : category
                }
            NewSubCategories.push(data)
            }
        }
    }
    const NewTeams = []
    for (let subcategory in teams){
        for(let team of teams[subcategory]){
            if(team["new"] == true){
                const data = {
                    "teamId" : team["id"],
                    "teamName" : team["title"],
                    "teamDescription" : "Description does not exist!",
                    "subCategoryId" : subcategory
                }
            NewTeams.push(data)
            }
        }
    }
    await SendNavigationTreeRequest(NewCategories,NewSubCategories,NewTeams)
}


export default SendNavigationTree