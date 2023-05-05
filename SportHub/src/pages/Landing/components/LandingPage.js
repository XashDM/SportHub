import Footer from "../../../modules/Footer";
import UserHeader from "../../../modules/UserHeader/components/UserHeader";
import styles from "../../../modules/UserHeader/style/style.module.scss";
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft";
import NotLoginedHeader from "../../../modules/NotLoginedHeader/componets/NotLoginedHeader";
import AdminHeader from "../../../modules/AdminHeader";
import {useAuthStore} from "../../../store/useAuthStore";
import {useNavigate} from "react-router-dom";


const LandingPage = () =>
{
    const { userData, setUserData} = useAuthStore()
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.container}>
                <NotLoginedHeader></NotLoginedHeader>
                <SidebarLeft></SidebarLeft>
                <Footer></Footer>
            </div>
        </>);
}
export default LandingPage;