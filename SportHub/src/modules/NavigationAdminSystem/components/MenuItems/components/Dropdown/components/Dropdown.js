// import MenuItems from "../../MenuItems";
import React,{Suspense} from "react";
import styles from "../styles/style.module.scss"
import Xarrow from "react-xarrows";

const MenuItems = React.lazy(() => import("../../MenuItems"))

const Dropdown = ({parent,submenus,dropdown,depthLevel}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? styles.dropdown_submenu : "";
    return (<ul className={`${styles.dropdown} ${dropdownClass} ${dropdown ? styles.show : ""}`}> 
            {
                submenus.map((submenu) => (<MenuItems items={submenu} key={submenu.id} depthLevel={depthLevel}/>))
            } 
            
        </ul>
        );
};

export default Dropdown;
