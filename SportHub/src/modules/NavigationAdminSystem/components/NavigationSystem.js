import styles from "../styles/style.module.scss"
import {menuItems} from "../../../constants/menuItems";
import MenuItems from "./MenuItems";



const NavigationSystem = () => {
return(
<div className={styles.nav_area} >
    <ul className={styles.menus}> 
    {
        menuItems.map((menu) => {
            const depthLevel = 0;
            return <MenuItems items={menu} key={menu.id} depthLevel={depthLevel}/>;
        })
     }
    </ul>           
</div>
)
};

export default NavigationSystem;