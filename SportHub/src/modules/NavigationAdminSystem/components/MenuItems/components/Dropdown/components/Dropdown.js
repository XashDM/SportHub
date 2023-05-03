import React from "react";
import styles from "../styles/style.module.scss"
const NavigationItems = React.lazy(() => import("../../NavigationItems"))

const Dropdown = ({parent,submenus,dropdown,depthLevel}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? styles.dropdown_submenu : "";
    return (<ul className={`${styles.dropdown} ${dropdownClass} ${dropdown ? styles.show : ""}`}> 
            {
                submenus.map((submenu) => (<NavigationItems items={submenu} key={submenu.id} depthLevel={depthLevel}/>))
            } 
            
        </ul>
        );
};

export default Dropdown;
