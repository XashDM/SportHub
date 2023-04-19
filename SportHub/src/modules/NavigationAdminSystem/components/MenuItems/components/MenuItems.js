import {useState,useEffect,useRef} from "react";
import styles from "../styles/style.module.scss"
import Dropdown from "./Dropdown";

const MenuItems = ({items,depthLevel}) => 
{
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    });

    const onMouseClick= () => {
        setDropdown(true);
    };


    return (
    <li className= {styles.menu_items} ref={ref} onClick={onMouseClick}>
        {items.submenu ? (
                <>
                <button type="button" aria-haspopup = "menu" aria-expanded = {dropdown ? "true" : "false"} 
                onClick = {() => setDropdown((prev) => !prev)} >
                    {items.title} 
                </button> 
                <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown}/> 
                </>
                ) : 
                (<button>
                    {items.title} 
                </button>)
        } 
        </li>
   );
};

export default MenuItems;