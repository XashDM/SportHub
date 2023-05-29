import React from "react";
import styles from "../styles/style.module.scss"
const NavigationItems = React.lazy(() => import("../../NavigationItems"))

const Dropdown = ({activeCategory,setActiveCategory,activeSubCategory,setActiveSubCategory,activeTeam,setActiveTeam,parent,submenus,dropdown,depthLevel}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? styles.dropdown_submenu : "";
    return (<ul className={`${styles.dropdown} ${dropdownClass} ${dropdown ? styles.show : ""}`}> 
            {
                submenus.map((submenu) => (<NavigationItems 
                                            activeCategory={activeCategory} setActiveCategory={setActiveCategory} 
                                            activeSubCategory={activeSubCategory} setActiveSubCategory={setActiveSubCategory} 
                                            activeTeam={activeTeam} setActiveTeam={setActiveTeam} 
                                            items={submenu} key={submenu.id} depthLevel={depthLevel}/>))
            } 
            
        </ul>
        );
};

export default Dropdown;
