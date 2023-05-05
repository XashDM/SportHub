import styles from "../style/style.module.scss"



function SidebarLeft()
{
    return (
        <>
            <aside className={styles.sidebar_left}>
                <div className={styles.list_of_menu_items}>
                    <ul>
                        <li>HOME</li>
                        <li>NBA</li>
                        <li>NFL</li>
                        <li>MLB</li>
                        <li>NHL</li>
                        <li>CBB</li>
                        <li>CFB</li>
                        <li>NASCAR</li>
                        <li>GOLF</li>
                        <li>SOCCER</li>
                        <li>TEAM HUB</li>
                        <li>LIFESTYLE</li>
                        <li>DEALBOOK</li>
                        <li>VIDEO</li>
                    </ul>
                </div>
                <div className={styles.media}>
                    <ul>
                        <span className={styles.share}>Follow</span>
                        <li><img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/Facebook2.svg'} ></img>
                            <img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/Twitter.svg'} ></img>
                        </li>
                        <li><img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/Google3.svg'}  ></img>
                            <img className={styles.icons} src={process.env.PUBLIC_URL + '/icons/YouTube.svg'}  ></img>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
export default SidebarLeft