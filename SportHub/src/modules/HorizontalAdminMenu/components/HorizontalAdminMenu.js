import React, {useRef, useState} from 'react'
import { ReactSVG } from "react-svg"
import styles from "../styles/style.module.scss"
import HorizontalAdminMenuElement from "./HorizontalAdminMenuElement"
import {HORIZONTAL_MENU_CONSTANT} from "../../../constants/HorizontalMenuConstants"

export default function HorizontalAdminMenu(){

    const [listOfSections, setListOfSections] = useState(HORIZONTAL_MENU_CONSTANT)
    const [currentSection, setCurrentSection] = useState(0)

    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const sectionElements = useRef(null)

    const scroll = (scrollOffsetVW) => {
        const scrollPixel = window.innerWidth * scrollOffsetVW / 100
        sectionElements.current?.scrollBy({ left: scrollPixel, behavior: "smooth" })

        sectionElements.current.scrollLeft + scrollPixel > 0 ? setCanScrollLeft(true) : setCanScrollLeft(false)
        sectionElements.current.scrollLeft + sectionElements.current.offsetWidth + scrollPixel < sectionElements.current.scrollWidth ? setCanScrollRight(true) : setCanScrollRight(false)
    }

    return (
        <div>
            <div className={styles.new_article_area}>
                <div className={styles.section_name}>{listOfSections[currentSection]}</div>
                <div className={styles.add_new_article_button}>+ New Article</div>
            </div>

            <div className={styles.horizontal_menu}>
                <div className={"left-arrow"} onClick={() => scroll(-20)}>
                    <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'}
                              className={canScrollLeft ? styles.arrow : styles.arrow_disable}/>
                </div>

                <div ref={sectionElements} className={styles.section_elements}>
                {listOfSections.map((section, index) => {
                    return <div onClick={() => setCurrentSection(index)} className={styles.horizontal_menu_element}>
                                <HorizontalAdminMenuElement  name={section} active={index === currentSection}  />
                            </div>
                    })}
                </div>
                <div className={styles.right_arrow} onClick={() => scroll(20)}>
                    <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'}
                              className={canScrollRight ? styles.arrow : styles.arrow_disable} />
                </div>
            </div>
        </div>
    )
}
