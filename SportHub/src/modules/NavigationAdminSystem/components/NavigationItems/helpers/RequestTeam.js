import axios from "axios";

const TeamsRequest = async (id) => {
    const preListTeams = (await axios.get(`https://localhost:7168/Teams/subcategory/${id}`))["data"]
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