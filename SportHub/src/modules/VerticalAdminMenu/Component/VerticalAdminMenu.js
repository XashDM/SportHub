import React, {useState} from 'react'
import "../Styles/VerticalAdminMenu.css"
import VerticalAdminMenuElement from "../../../Components/VerticalAdminMenuElement";

export default function VerticalAdminMenu(){

    const [verticalMenuElements, setVerticalMenuElements] = useState(
        ["Surveys", "Banners", "Languages", "Shares",
            "MyUsers", "IA", "Teams", "NewsPartners", "Advertising"])
    const [hintText, setHintText] = useState(
        ["Surveys", "Banners", "Languages", "Shares",
            "My users", "IA", "Teams", "News Partners", "Advertising"])
    const [currentVerticalMenuElement, setCurrentVerticalMenuElement] = useState();
    return (
        <div>
            <div className={"vertical-menu"}>
                {verticalMenuElements.map((verticalMenuElement, index) => {
                    return <div
                        onClick={() => setCurrentVerticalMenuElement(index)} className={"vertical-menu-element"}>

                        <VerticalAdminMenuElement
                            name={verticalMenuElement}
                            hintText={hintText[index]}
                            active={index === currentVerticalMenuElement}  />
                    </div>
                })}
            </div>
        </div>
    )
}
