import React from "react"
import Footer from "../../../modules/Footer";
import styles from "../styles/style.module.scss"
import SidebarLeft from "../../../modules/Sidebar-left/componets/SidebarLeft";
import Header from "../../../modules/Header";

export default function HomePage(){
    return (
        <>
            <div className={styles.container}>
                <Header/>
                <SidebarLeft></SidebarLeft>
                <Footer/>
                <div style={{background: "red", width: "100%", height: "100%"}}></div>
            </div>
        </>);
}
