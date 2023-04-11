import React from "react";
import "../Styles/ProfileDropdownList.css"

export default function ProfileDropdownList(props)
{
        return(
            <div>
                <div className={props.active ? "DropdownList-active" : "DropdownList-inactive"}>
                    <div className={"name-surname"}>Test Testenko</div>
                    <div className={"email"}>testtestenko@gmail.com</div>
                    <div className={"view-profile-button"}>VIEW PROFILE</div>
                    <div className={"personal"}>Personal</div>
                    <div className={"change-password"}>Change password</div>
                    <div className={"log-out"}>Log out</div>
                </div>
            </div>
        )
}