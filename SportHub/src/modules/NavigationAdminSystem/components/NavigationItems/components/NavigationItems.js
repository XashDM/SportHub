import React,{useState,useTransition,useEffect,useRef,Suspense} from "react"
import styles from "../styles/style.module.scss"
import SubCategoryRequest from "../helpers/RequestsSubCategories"
import TeamsRequest from "../helpers/RequestTeam"
import Xarrow, {Xwrapper,useXarrow} from "react-xarrows"
import { useNavigationItemsSubCategories,useNavigationItemsTeams } from "../../../../../store/useNavigationTreeStore"
import EditMenu from "./EditMenu"
import { ReactSVG } from "react-svg"
import { useSetAtom } from "jotai"

const Dropdown = React.lazy(() => import("./Dropdown"))


const NavigationItems = ({activeCategory,setActiveCategory,activeSubCategory,setActiveSubCategory,activeTeam,setActiveTeam,items,depthLevel,nav_container,nav_click_area,index}) => 
{   
    const [,startTransition] = useTransition()
    const [load, setLoad] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [submenu,setSubmenu] = useState(false)
    const [isActive,setIsActive] = useState(false)
    const [isHidden,setIsHidden] = useState(items.isHidden)
    const [showEdit,setShowEdit] = useState(false)
    const [showEditMenu,setShowEditMenu] = useState(false)
    const subCategories = useNavigationItemsSubCategories(state => state.subcategories)
    const addSubCategory = useNavigationItemsSubCategories(state => state.addSubCategory)
    const deletedSubCategory = useNavigationItemsSubCategories(state => state.deleted)
    const teams = useNavigationItemsTeams(state => state.teams)
    const addTeams = useNavigationItemsTeams(state => state.addTeam)
    const deletedTeams = useNavigationItemsTeams(state => state.deleted)

    let ref = useRef();
    console.log(items)
    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target) && nav_container.current.contains(event.target)) {
                setDropdown(false)
                setIsActive(false)
            }
            if (!nav_click_area.current.contains(event.target) && nav_container.current.contains(event.target)){
                setActiveCategory(null)
                setActiveSubCategory(null)
                setActiveTeam(null)
            }
        };
        document.addEventListener("mousedown", handler)
        document.addEventListener("touchstart", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
            document.removeEventListener("touchstart", handler)
            
        };
    },[dropdown]);

    const Clicking = async ()=>{
        let data_list
        if (depthLevel === 0){
            if (!subCategories[items.id]){
                data_list = await SubCategoryRequest(items.id);
                addSubCategory(items.id,data_list)
            }
            setIsActive(true)
            setActiveCategory(items.id)
        }
        else if (depthLevel ===1){
            if (!teams[items.id]){
                data_list = await TeamsRequest(items.id);
                addTeams(items.id,data_list)
            }
            else{
                setSubmenu(teams[items.id])
            }
            setIsActive(true)
            setActiveSubCategory(items.id)
        }
        else if (depthLevel === 2){
            setIsActive(true)
            setActiveTeam(items.id)
        }

        setDropdown(true)
        setShowEdit(true)
        startTransition(() => {
            setLoad(true)
        });
    }

    useEffect(()=>{
        if(depthLevel === 0){
            setSubmenu(subCategories[items.id])
        }
    },[activeCategory,subCategories[items.id],subCategories,deletedSubCategory])

    useEffect(()=>{
        if(depthLevel === 1){
            setSubmenu(teams[items.id])
        }
    },[teams[items.id],deletedTeams])

    let showEditMouseEnterFunct = () => {
        if (isActive){
            setShowEdit(true)
        }
    }

    let showEditMouseLeaveFunct = () => {
        if (isActive){
            setShowEdit(false)
        }
    }

    useEffect(()=>{setIsHidden(items.isHidden)},[items.isHidden])

    return (
    <li onLoad={useXarrow()} id={`${items.id}-${items.title}`} className={styles.menu_items} ref={ref}>
        {
                <>
                <button onMouseEnter={showEditMouseEnterFunct} onMouseLeave={showEditMouseLeaveFunct} onClick={() => Clicking()} className={isActive ? styles.active : ""}  type="button" aria-haspopup = "menu" aria-expanded = {dropdown ? "true" : "false"}>
                    {items.title} 
                    {showEdit && <ReactSVG onClick={() => setShowEditMenu(!showEditMenu)} className={showEditMenu ? `${styles.EditThreeDots} ${styles.ActiveEditThreeDots}`:`${styles.EditThreeDots}`} src={process.env.PUBLIC_URL + "/icons/"+ "EditThreeDots" + ".svg"} />}
                    {showEditMenu && <EditMenu item={items} setShowEditMenu={setShowEditMenu} itemId={items.id} depthLevel={depthLevel}/>} 
                    {isHidden && <div className={styles.HiddenTag}>hidden</div>}
                </button>  
                {(load && submenu) && (
                <Xwrapper>
                <Suspense fallback={'Loading...'}>
                <Dropdown   activeCategory={activeCategory} 
                            setActiveCategory={setActiveCategory} 
                            activeSubCategory={activeSubCategory} 
                            setActiveSubCategory={setActiveSubCategory} 
                            activeTeam={activeTeam} 
                            setActiveTeam={setActiveTeam} 
                            parent={`${items.id}-${items.title}`} 
                            depthLevel={depthLevel} 
                            submenus={submenu} 
                            dropdown={dropdown} 
                            nav_container={nav_container} 
                            nav_click_area={nav_click_area} 
                            CategoryIndex={index}/> 
                <div className={dropdown? styles.show_arrow : styles.hide_arrow}>
                {   
                    submenu.map((submenu)=>(<Xarrow
                                                    key = {submenu.id}
                                                    start={`${items.id}-${items.title}`}
                                                    end = {`${submenu.id}-${submenu.title}`}
                                                    startAnchor = "right"
                                                    endAnchor = "left"
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

export default NavigationItems;