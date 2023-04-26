import React from "react";
import {useState,useTransition,useEffect,useRef,Suspense} from "react";
import styles from "../styles/style.module.scss"
import SubCategoryRequest from "../helpers/RequestsSubCategories";
import TeamsRequest from "../helpers/RequestTeam";
// import Dropdown from "./Dropdown";
import Xarrow, {Xwrapper,useXarrow} from "react-xarrows";

const Dropdown = React.lazy(() => import("./Dropdown"))


const MenuItems = ({items,depthLevel}) => 
{   
    const [,startTransition] = useTransition(); 
    const [load, setLoad] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [submenu,setSubmenu] = useState(false)

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
    },[dropdown]);

    const Clicking = async ()=>{
        let data_list;
        if (depthLevel === 0){
            data_list = await SubCategoryRequest(items.id);
        }
        else if (depthLevel ===1){
            data_list = await TeamsRequest(items.id);
        }
       
        setSubmenu(data_list)
        console.log(submenu)
        setDropdown(true);
        startTransition(() => {
            setLoad(true);
        });
    }

    return (
    <li onLoad={useXarrow()} id={`${items.id}-${items.title}`} className={styles.menu_items} ref={ref} onClick={() => Clicking()}>
        {
                <>
                <button  type="button" aria-haspopup = "menu" aria-expanded = {dropdown ? "true" : "false"}>
                    {items.title} 
                </button>  
                {(load && submenu) && (<Xwrapper>
                <Suspense fallback={'Loading...'}>
                <Dropdown parent={`${items.id}-${items.title}`} depthLevel={depthLevel} submenus={submenu} dropdown={dropdown}/> 
                <div className={dropdown? styles.show_arrow : styles.hide_arrow}>
                {   
                    submenu.map((submenu)=>(<Xarrow
                                                    key = {submenu.id}
                                                    start={`${items.id}-${items.title}`}
                                                    end = {`${submenu.id}-${submenu.title}`}
                                                    showHead = {false}
                                                    dashness = {true}
                                                    strokeWidth={2}
                                                    gridBreak = "50%"
                                                    color="#B2B2B2"
                                                    path="grid"
                    />))
                }
                </div>
                </Suspense>
                </Xwrapper>)}  
            
                </>
               
                
        } 
        </li>
   );
};

export default MenuItems;