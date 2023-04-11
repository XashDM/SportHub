import React, { Component } from 'react';
import '../Styles/AdminPage.css';
import Header from "../../../modules/Header/Components/Header";
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu/Components/HorizontalAdminMenu";
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu";

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
