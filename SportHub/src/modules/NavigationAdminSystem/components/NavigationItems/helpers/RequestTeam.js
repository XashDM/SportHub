import axios from "axios";

const TeamsRequest = async (id) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    const preListTeams = (await axios.get(`${backendHost}/Teams/subcategory/${id}`))["data"]
    const TeamsLists = []
    for (let i of preListTeams){
        i.id = i.teamId
        i.title = i.teamName
        delete i.teamId
        delete i.teamName
        TeamsLists.push(i)
    }
    return TeamsLists
}


export default TeamsRequest