import axios from "axios";
import { useNavigationItemsCategories } from "../../../store/useNavigationTreeStore";
import AddCategoryRequest from "./AddCategoryRequest";

const SendForCreation =async (AddRequest,itemsList) => {
    itemsList.filter(item => "new" in item).map(AddRequest)
}

const SendNavigationTree = async () => {
    const categories = useNavigationItemsCategories.getState().categories
    await SendForCreation(AddCategoryRequest,categories)
}


export default SendNavigationTree