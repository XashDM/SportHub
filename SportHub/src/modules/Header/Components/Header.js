import React, {useState} from 'react';
import '../Styles/Header.css';
import '../../../Styles/Hint/Hint.css';
import ProfileDropdownList from "../../../Components/ProfileDropdownList";

export default function Header(){

    const [profileDropdownListActive, setProfileDropdownListActive] = useState(false)
    return (
        <div>
            <div className="header">

                <div className="logo">
                    <p className="logo-inscription">Sports Hub</p>
                </div>

                <div className="profile-sector">

                    <div className="switch">
                        <span hint="Switch to user view" direction="down">
                            <img className="switch-image" src={process.env.PUBLIC_URL + '/icons/AccountSwitcher.svg'} />
                        </span>
                    </div>

                    <div className="mini-profile" onClick={() => setProfileDropdownListActive(!profileDropdownListActive)}>

                        <img className="profile-picture" src="https://images.pexels.com/photos/14306688/pexels-photo-14306688.jpeg" />

                        <div className="profile-info" >
                            <div className="profile-labels">
                                <div className="name-surname-label">
                                    Test Testenko
                                    <img className="open-profile-menu" src={process.env.PUBLIC_URL + '/icons/Polygon.svg'} />
                                </div>
                                <div className="administrator-label">Administrator</div>
                            </div>
                            <ProfileDropdownList active={profileDropdownListActive} />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
