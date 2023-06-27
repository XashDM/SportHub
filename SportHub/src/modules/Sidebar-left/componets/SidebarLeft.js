import styles from "../style/style.module.scss"

function SidebarLeft()
{
    const list = ['HOME', 'NBA', 'NFL', 'MLB', 'NHL', "CBB", "CFB",
    "NASCAR", "GOLF", "SOCCER", "TEAM HUB", "LIFESTYLE", "DEALBOOK", "VIDEO"]


    return (
        <div className={styles.sidebar}>
            <aside className={styles.sidebar_left}>
                <div className={styles.list_of_menu_items}>
                    <ul>
                        {list.map((item)=>{
                            return (
                                <li>{item}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className={styles.media}>
                    <ul>
                        <span className={styles.share}>Follow</span>
                        <li><img className={styles.icons} src={'/icons/FacebookWithoutCircle.svg'} ></img>
                            <img className={styles.icons} src={''} ></img>
                        </li>
                        <li><img className={styles.icons} src={'/icons/GoogleWithoutCircle.svg'}  ></img>
                            <img className={styles.icons} src={'/icons/YouTube.svg'}  ></img>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
export default SidebarLeft
