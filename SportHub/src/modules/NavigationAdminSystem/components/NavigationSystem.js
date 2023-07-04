import React,{useEffect, useState, useRef} from 'react';
import styles from "../styles/style.module.scss"
import CategoryRequest from "../helpers/CategoryRequest"
import NavigationItems from "./NavigationItems";
import AddButton from './AddButton';
import PopUpAddCategory from './AddCategoryPopUp';
import PopUpAddSubCategory from './AddCategoryPopUp/components/AddSubCategoryPopUp';
import FlashMessage from '../../../ui/FlashMessage';
import { useNavigationItemsCategories,useNavigationItemsSubCategories } from '../../../store/useNavigationTreeStore';
import SendNavigationTree from '../helpers/SendNavigationTreeToServer';


const NavigationSystem = ({setButtons}) => {
    // const [categories,setCategories] = useState([])
    const categories = useNavigationItemsCategories((state) => state.categories)
    const setCategories = useNavigationItemsCategories((state) => state.setCategory)
    const addCategory = useNavigationItemsCategories((state) => state.addCategory)
    const addSubCategory = useNavigationItemsSubCategories((state) => state.addNewSubCategory)
    const [activeCategory,setActiveCategory] = useState(null)
    const [activeSubCategory,setActiveSubCategory] = useState(null)
    const [activeTeam,setActiveTeam] = useState(null)

    const [openFlashMessage, setOpenFlashMessage] = useState(false)
    const [flashIsSuccess, setFlashIsSuccess] = useState(true)
    const [flashTitle, setFlashTitle] = useState()
    const [flashContent, setFlashContent] = useState()

    const [openPopUpAddCategory,setOpenPopUpAddCategory] = useState(false)
    const [openPopUpAddSubCategory,setOpenPopUpAddSubCategory] = useState(false)

    const nav_container = useRef(null)

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
        if (value){
            // AddCategoryRequest(value)
            addCategory(value)
            handleClosePopUpAddCategory()
        }
    }

    const handleAddSubCategory = (activeCategory,value) => {
        if (value && activeCategory){
            // AddCategoryRequest(value)
            addSubCategory(activeCategory,value)
            handleClosePopUpAddSubCategory()
        }
    }

    const handleSendTree = async () =>{
        await SendNavigationTree()
        setFlashTitle("Saved!")
        setFlashContent("Success")
        setFlashIsSuccess(true)
        setOpenFlashMessage(true)
    }


return(
<div className={styles.navigation_container}>
<div className={styles.button_container}>
    <AddButton text={"+ Add category"} onClick={handleOpenPopUpAddCategory}/>
    <AddButton text={"+ Add subcategory"} onClick={handleOpenPopUpAddSubCategory}/>
    <AddButton text={"+ Add team"}/>
</div>
<PopUpAddCategory open={openPopUpAddCategory} handleAdd={handleAddCategory} handleClose={handleClosePopUpAddCategory}/>
<PopUpAddSubCategory activeCategory={activeCategory} open={openPopUpAddSubCategory} handleAdd={handleAddSubCategory} handleClose={handleClosePopUpAddSubCategory}/>
<div ref={nav_container} className={styles.nav_container}>
    <div className={styles.nav_area}>
        <ul className={styles.menus}> 
        {
            categories.map((menu) => {
                const depthLevel = 0;
                return <NavigationItems 
                activeCategory={activeCategory} setActiveCategory={setActiveCategory} 
                activeSubCategory={activeSubCategory} setActiveSubCategory={setActiveSubCategory} 
                activeTeam={activeTeam} setActiveTeam={setActiveTeam} 
                items={menu} key={menu.id} depthLevel={depthLevel} nav_container={nav_container}/>;
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