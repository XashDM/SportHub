import Footer from "../../../modules/Footer";
import styles from "../../../modules/UserHeader/style/style.module.scss";
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft";
import Header from "../../../modules/Header";

const LandingPage = () =>
{
    return (
        <>
                <Header/>
            <div className={styles.container}>
                <SidebarLeft></SidebarLeft>
                <Footer/>
            </div>
        </>);
}
export default LandingPage;