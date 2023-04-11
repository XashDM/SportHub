import React, { Component } from 'react';
import "../Styles/HorizontalAdminMenuElement.css";

export default function HorizontalAdminMenuElement(props) {

        return (
            <div>
                <div className={props.active === true ? "active" : "inactive"}>{props.name}</div>
            </div>
        )
}
