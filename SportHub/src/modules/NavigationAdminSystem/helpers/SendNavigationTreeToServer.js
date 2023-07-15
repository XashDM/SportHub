import axios from "axios";
import { useNavigationItemsCategories,useNavigationItemsSubCategories,useNavigationItemsTeams } from "../../../store/useNavigationTreeStore";

const SendNavigationTreeAppendRequest = async (Categories,SubCategories,Teams) => {
    const body = {
        "categories" : Categories,
        "subcategories" : SubCategories,
        "teams" : Teams
    }
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    if (Categories.length!=0 || SubCategories.length!=0 || Teams.length!=0){
        const response = await axios.post(`${backendHost}/NavigationTree/append`,body,{
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    console.log(response)
    }
}

const SendNavigationTreeDeletedRequest = async (deleteCategories,deleteSubCategories,deleteTeams) => {
    const body = {
        "categories" : [...deleteCategories],
        "subCategories" : [...deleteSubCategories],
        "teams" : [...deleteTeams]
    }
    console.log(body,typeof(body))
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    if (deleteCategories.length!=0 || deleteSubCategories.length!=0 || deleteTeams.length!=0){
        const response = await axios.delete(`${backendHost}/NavigationTree/delete`, {
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(body)
          });
        useNavigationItemsCategories.getState().clearDeleted()
        useNavigationItemsSubCategories.getState().clearDeleted()
        useNavigationItemsTeams.getState().clearDeleted()
        console.log(response)
    }
}

const SendNavigationTreeHideRequest = async (Categories,SubCategories,Teams) => {
    const body = {
        "categories" : Categories,
        "subcategories" : SubCategories,
        "teams" : Teams
    }
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    if (Categories.length!=0 || SubCategories.length!=0 || Teams.length!=0){
        const response = await axios.put(`${backendHost}/NavigationTree/hide`,body,{
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    console.log(response)
    }
}

const GetAppendTree = async (categories,subCategories,teams) => {
    const NewCategories = []
    for (let category of categories){
        if (category["new"] == true){
            const data = {
                "categoryId" : category["id"],
                "categoryName" :  category["title"],
                "isHidden" : category["isHidden"]
            }
            NewCategories.push(data)
        }
    }
    const NewSubCategories = []
    for (let category in subCategories){
        for(let subcategory of subCategories[category]){
            if(subcategory["new"] == true){
                const data = {
                    "subCategoryId" : subcategory["id"],
                    "subCategoryName" : subcategory["title"],
                    "categoryId" : category,
                    "isHidden" : subcategory["isHidden"]
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
                    "subCategoryId" : subcategory,
                    "isHidden" : team["isHidden"]
                }
            NewTeams.push(data)
            }
        }
    }
    return [NewCategories,NewSubCategories,NewTeams]
}

const GetHideTree = async (categories,subCategories,teams) => {
    const NewCategories = []
    for (let category of categories){
        if (category["hide"] == true){
            const data = {
                "id" : category["id"],
                "isHidden" : category["isHidden"]
            }
            NewCategories.push(data)
        }
    }
    const NewSubCategories = []
    for (let category in subCategories){
        for(let subcategory of subCategories[category]){
            if(subcategory["hide"] == true){
                const data = {
                    "id" : subcategory["id"],
                    "isHidden" : subcategory["isHidden"]
                }
            NewSubCategories.push(data)
            }
        }
    }
    const NewTeams = []
    for (let subcategory in teams){
        for(let team of teams[subcategory]){
            if(team["hide"] == true){
                const data = {
                    "id" : team["id"],
                    "isHidden" : team["isHidden"]
                }
            NewTeams.push(data)
            }
        }
    }
    return [NewCategories,NewSubCategories,NewTeams]
}

const SendNavigationTree = async () => {
    const categories = useNavigationItemsCategories.getState().categories
    const subCategories = useNavigationItemsSubCategories.getState().subcategories
    const teams = useNavigationItemsTeams.getState().teams
    const deletedCategories = useNavigationItemsCategories.getState().deleted
    const deletedSubCategories = useNavigationItemsSubCategories.getState().deleted
    const deletedTeams = useNavigationItemsTeams.getState().deleted
    const [NewCategories,NewSubCategories,NewTeams]=await GetAppendTree(categories,subCategories,teams)
    const [NewHideCategories,NewHideSubCategories,NewHideTeams]=await GetHideTree(categories,subCategories,teams)
    await SendNavigationTreeAppendRequest(NewCategories,NewSubCategories,NewTeams)
    await SendNavigationTreeHideRequest(NewHideCategories,NewHideSubCategories,NewHideTeams)
    await SendNavigationTreeDeletedRequest(deletedCategories,deletedSubCategories,deletedTeams)
}


export default SendNavigationTree