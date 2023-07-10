import React from "react";
import styles from "../styles/style.module.scss"
const NavigationItems = React.lazy(() => import("../../NavigationItems"))

const Dropdown = ({activeCategory,setActiveCategory,activeSubCategory,setActiveSubCategory,activeTeam,setActiveTeam,parent,submenus,dropdown,depthLevel,nav_container,nav_click_area,CategoryIndex}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? styles.dropdown_submenu : "";
    const topPush = -CategoryIndex*50;
    return (<ul style={{top:topPush}} className={`${styles.dropdown} ${dropdownClass} ${dropdown ? styles.show : ""}`}> 
            {
                submenus.map((submenu,index) => (<NavigationItems 
                                            activeCategory={activeCategory} setActiveCategory={setActiveCategory} 
                                            activeSubCategory={activeSubCategory} setActiveSubCategory={setActiveSubCategory} 
                                            activeTeam={activeTeam} setActiveTeam={setActiveTeam} 
                                            items={submenu} key={submenu.id} depthLevel={depthLevel}  nav_click_area={nav_click_area}
                                            nav_container={nav_container} index={index}/>))
            } 
            
        </ul>
        );
};

export default Dropdown;
