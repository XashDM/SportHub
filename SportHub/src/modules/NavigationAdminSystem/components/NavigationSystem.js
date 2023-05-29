import React,{useEffect, useState} from 'react';
import styles from "../styles/style.module.scss"
import CategoryRequest from "../helpers/CategoryRequest"
import NavigationItems from "./NavigationItems";
import AddButton from './AddButton';


const NavigationSystem = () => {
    const [categories,setCategories] = useState([])
    const [activeCategory,setActiveCategory] = useState(null)
    const [activeSubCategory,setActiveSubCategory] = useState(null)
    const [activeTeam,setActiveTeam] = useState(null)

    useEffect(() => {
        const fetctCategories = async () => {
            setCategories(await CategoryRequest())
        }
        fetctCategories()
    },[])

return(
<div className={styles.navigation_container}>
<div className={styles.button_container}>
    <AddButton text={"+ Add category"}/>
    <AddButton text={"+ Add subcategory"}/>
    <AddButton text={"+ Add team"}/>
</div>
<div className={styles.nav_area}>
    <ul className={styles.menus}> 
    {
        categories.map((menu) => {
            const depthLevel = 0;
            return <NavigationItems 
            activeCategory={activeCategory} setActiveCategory={setActiveCategory} 
            activeSubCategory={activeSubCategory} setActiveSubCategory={setActiveSubCategory} 
            activeTeam={activeTeam} setActiveTeam={setActiveTeam} 
            items={menu} key={menu.id} depthLevel={depthLevel}/>;
        })
     }
    </ul>           
</div>
</div>
)
};

export default NavigationSystem;