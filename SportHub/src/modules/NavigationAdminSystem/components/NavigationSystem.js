import React from 'react';
import styles from "../styles/style.module.scss"
import CategoryRequest from "../helpers/CategoryRequest"
import NavigationItems from "./NavigationItems";


const NavigationSystem = () => {
    const categories = CategoryRequest()
return(
<div className={styles.nav_area}>
    <ul className={styles.menus}> 
    {
        categories.map((menu) => {
            const depthLevel = 0;
            return <NavigationItems items={menu} key={menu.id} depthLevel={depthLevel}/>;
        })
     }
    </ul>           
</div>
)
};

export default NavigationSystem;