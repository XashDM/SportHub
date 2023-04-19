import MenuItems from "../../MenuItems";
import styles from "../styles/style.module.scss"

const Dropdown = ({submenus,dropdown,depthLevel}) => {
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
