import React, { Component } from 'react';
import '../Styles/AdminPage.css';
import Header from "../../../Modules/Header/Components/Header";
import HorizontalAdminMenu from "../../../Modules/HorizontalAdminMenu/Components/HorizontalAdminMenu";
import VerticalAdminMenu from "../../../Modules/VerticalAdminMenu";

export default class AdminPage extends Component {
    
    render() {
        return (
            <div>
                <Header />
                <HorizontalAdminMenu />
                <VerticalAdminMenu />
            </div>
        );
    }

}
