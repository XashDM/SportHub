import React, {Component, useRef, useState} from 'react';
import { ReactSVG } from "react-svg";
import "../Styles/HorizontalAdminMenu.css";
import HorizontalAdminMenuElement from "../../../components/HorizontalAdminMenuElement/Components/HorizontalAdminMenuElement";

export default function HorizontalAdminMenu(){

    const [listOfSections, setListOfSections] = useState(["Home", "NBA", "NFL", "MLB", "NHL", "CBB", "CFB",
        "NASCAR", "GOLF", "VIDEO", "LIFESTYLE", "DEALBOOK", "TEST1", "TEST2", "TEST3", "TEST4", "TEST5", "TEST6",
        "TEST7", "TEST8", "TEST9", "TEST10", "TEST11", "TEST12", "TEST13"])
    const [currentSection, setCurrentSection] = useState(0)

    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const sectionElements = useRef(null)

    const scroll = (scrollOffsetVW) => {
        const scrollPixel = window.innerWidth * scrollOffsetVW / 100
        sectionElements.current?.scrollBy({ left: scrollPixel, behavior: "smooth" });

        sectionElements.current.scrollLeft + scrollPixel > 0 ? setCanScrollLeft(true) : setCanScrollLeft(false)
        sectionElements.current.scrollLeft + sectionElements.current.offsetWidth + scrollPixel < sectionElements.current.scrollWidth ? setCanScrollRight(true) : setCanScrollRight(false)
    }

    return (
        <div>
            <div className={"new-article-area"}>
                <div className={"section-name"}>{listOfSections[currentSection]}</div>
                <div className={"add-new-article-button"}>+ New Article</div>
            </div>

            <div className={"horizontal-menu"}>
                <div className={"left-arrow"} onClick={() => scroll(-20)}>
                    <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'}
                              className={canScrollLeft ? "arrow" : "arrow-disable"}/>
                </div>

                <div ref={sectionElements} className={"section-elements"}>
                {listOfSections.map((section, index) => {
                    return <div onClick={() => setCurrentSection(index)} className={"horizontal-menu-element"}>
                                <HorizontalAdminMenuElement  name={section} active={index === currentSection}  />
                            </div>
                    })}
                </div>
                <div className={"right-arrow"} onClick={() => scroll(20)}>
                    <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'}
                              className={canScrollRight ? "arrow" : "arrow-disable"} />
                </div>
            </div>
        </div>
    );
}
