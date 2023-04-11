import React from 'react';
import {ReactSVG} from "react-svg";
import "../Styles/VerticalAdminMenuElement.css"
import "../../../Styles/Hint/Hint.css"

export default function VerticalAdminMenuElement(props) {

    const active = props.active === true ? "-active" : "-inactive"

    return (
            <div>
                <div className={props.active === true ? "active" : "inactive"}
                     hint={props.hintText} direction={"right"}>
                    <ReactSVG src={process.env.PUBLIC_URL + "/icons/VerticalMenu/"+ props.name + ".svg"}  />
                </div>
            </div>
    )
}
