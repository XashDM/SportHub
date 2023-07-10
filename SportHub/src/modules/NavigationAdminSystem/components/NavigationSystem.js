import React,{useEffect, useState, useRef} from 'react';
import styles from "../styles/style.module.scss"
import CategoryRequest from "../helpers/CategoryRequest"
import NavigationItems from "./NavigationItems";
import AddButton from './AddButton';
import PopUpAddCategory from './AddCategoryPopUp';
import PopUpAddSubCategory from './AddCategoryPopUp/components/AddSubCategoryPopUp';
import PopUpAddTeam from './AddCategoryPopUp/components/AddTeamPopUp';
import FlashMessage from '../../../ui/FlashMessage';
import { useNavigationItemsCategories,useNavigationItemsSubCategories,useNavigationItemsTeams } from '../../../store/useNavigationTreeStore';
import SendNavigationTree from '../helpers/SendNavigationTreeToServer';
import {Reorder} from "framer-motion";


const NavigationSystem = ({setButtons}) => {
    // const [categories,setCategories] = useState([])
    const categories = useNavigationItemsCategories((state) => state.categories)
    const setCategories = useNavigationItemsCategories((state) => state.setCategory)
    const addCategory = useNavigationItemsCategories((state) => state.addCategory)
    const addSubCategory = useNavigationItemsSubCategories((state) => state.addNewSubCategory)
    const addTeam = useNavigationItemsTeams((state) => state.addNewTeam)

    const [activeCategory,setActiveCategory] = useState(null)
    const [activeSubCategory,setActiveSubCategory] = useState(null)
    const [activeTeam,setActiveTeam] = useState(null)

    const [openFlashMessage, setOpenFlashMessage] = useState(false)
    const [flashIsSuccess, setFlashIsSuccess] = useState(true)
    const [flashTitle, setFlashTitle] = useState()
    const [flashContent, setFlashContent] = useState()

    const [openPopUpAddCategory,setOpenPopUpAddCategory] = useState(false)
    const [openPopUpAddSubCategory,setOpenPopUpAddSubCategory] = useState(false)
    const [openPopUpAddTeam,setOpenPopUpAddTeam] = useState(false)

    const nav_container = useRef(null)
    const nav_click_area = useRef(null)

    const handleCloseFlashMessage = () => {
        setOpenFlashMessage(false)
    }

    const handleOpenPopUpAddCategory = () => {
        setOpenPopUpAddCategory(true)
    }

    const handleClosePopUpAddCategory = () => {
        setOpenPopUpAddCategory(false)
    }

    const handleOpenPopUpAddSubCategory = () => {
        setOpenPopUpAddSubCategory(true)
    }

    const handleClosePopUpAddSubCategory = () => {
        setOpenPopUpAddSubCategory(false)
    }

    const handleOpenPopUpAddTeam = () => {
        setOpenPopUpAddTeam(true)
    }

    const handleClosePopUpAddTeam = () => {
        setOpenPopUpAddTeam(false)
    }

    useEffect(() => {
        setButtons([{text: "Save changes", function: handleSendTree, isOutlined: false}])
        const FetchCategories = async () => {
            const categoryList = await CategoryRequest()
            setCategories(categoryList)
            // setCategories(await CategoryRequest())
        }
        FetchCategories()
    },[])

    const handleAddCategory = (value) => {
        let Categorynames = categories.map(element => element.title)
        if (value && !(Categorynames.includes(value))){
            // AddCategoryRequest(value)
            addCategory(value)
            handleClosePopUpAddCategory()
        }
    }

    const handleAddSubCategory = (activeCategory,value) => {
        console.log(activeCategory)
        if (value && activeCategory){
            // AddCategoryRequest(value)
            addSubCategory(activeCategory,value)
            handleClosePopUpAddSubCategory()
        }
    }

    const handleAddTeam = (activeSubCategory,value) => {
        if (value && activeSubCategory){
            addTeam(activeSubCategory,value)
            handleClosePopUpAddTeam()
        }
    }

    const handleSendTree = async () =>{
        let response = await SendNavigationTree()
        console.log(response)
        useNavigationItemsSubCategories.getState().clear()
        useNavigationItemsTeams.getState().clear()
        setFlashTitle("Saved!")
        setFlashContent("The information architecture is successfuly saved!")
        setFlashIsSuccess(true)
        setOpenFlashMessage(true)
        const categoryList = await CategoryRequest()
        setCategories(categoryList)
    }


return(
<div className={styles.navigation_container}>
<div className={styles.button_container}>
    <AddButton text={"+ Add category"} onClick={handleOpenPopUpAddCategory}/>
    <AddButton text={"+ Add subcategory"} onClick={handleOpenPopUpAddSubCategory}/>
    <AddButton text={"+ Add team"} onClick={handleOpenPopUpAddTeam}/>
</div>
<PopUpAddCategory open={openPopUpAddCategory} handleAdd={handleAddCategory} handleClose={handleClosePopUpAddCategory}/>
<PopUpAddSubCategory activeCategory={activeCategory} open={openPopUpAddSubCategory} handleAdd={handleAddSubCategory} handleClose={handleClosePopUpAddSubCategory}/>
<PopUpAddTeam activeSubCategory={activeSubCategory} open={openPopUpAddTeam} handleAdd={handleAddTeam} handleClose={handleClosePopUpAddTeam}/>
<div ref={nav_container} className={styles.nav_container}>
    <div ref={nav_click_area} className={styles.nav_area}>
        <ul className={styles.menus}> 
        {
            categories.map((menu,index) => {
                const depthLevel = 0;
                return <NavigationItems 
                activeCategory={activeCategory} setActiveCategory={setActiveCategory} 
                activeSubCategory={activeSubCategory} setActiveSubCategory={setActiveSubCategory} 
                activeTeam={activeTeam} setActiveTeam={setActiveTeam} 
                items={menu} key={menu.id} depthLevel={depthLevel} nav_container={nav_container} nav_click_area={nav_click_area}
                index={index}/>;
            })
        }
        </ul>           
    </div>
</div>
<FlashMessage   title={flashTitle} 
                content={flashContent} 
                open={openFlashMessage}
                isSuccess={flashIsSuccess}
                handleClose={handleCloseFlashMessage} />
</div>
)
};

export default NavigationSystem;