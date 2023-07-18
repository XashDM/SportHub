import React, { useRef, useState, useEffect } from 'react'
import { ReactSVG } from "react-svg"
import styles from "../styles/style.module.scss"
import HorizontalAdminMenuElement from "./HorizontalAdminMenuElement"
import Button from "../../../ui/Button"

import getCategoriesRequest from "../helpers/getCategoriesRequest"
import { useTranslation } from 'react-i18next'

export default function HorizontalAdminMenu({ currentMenuElement, setCurrentMenuElement, headerButtons, setSelectedCategory }) {
    const { t, i18n } = useTranslation()

    const [listOfSections, setListOfSections] = useState([])

    const [leftArrow, setLeftArrow] = useState()
    const [sectionElementsForm, setSectionElementsForm] = useState()
    const [rightArrow, setRightArrow] = useState()

    const [isBiggerThanWindowWidth, setIsBiggerThanWindowWidth] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const sectionElements = useRef(null)

    const CheckIsBiggerThanWindowWidth = () => {
        setIsBiggerThanWindowWidth(sectionElements.current?.offsetWidth + window.innerWidth * 20 / 100 > window.innerWidth)
    }

    const scroll = (scrollOffsetVW) => {
        const scrollPixel = window.innerWidth * scrollOffsetVW / 100
        sectionElements.current?.scrollBy({ left: scrollPixel, behavior: "smooth" })

        sectionElements.current.scrollLeft + scrollPixel > 0 ? setCanScrollLeft(true) : setCanScrollLeft(false)
        sectionElements.current.scrollLeft + sectionElements.current.offsetWidth + scrollPixel < sectionElements.current.scrollWidth ? setCanScrollRight(true) : setCanScrollRight(false)
    }

    const getCategories = async () => {
        const result = await getCategoriesRequest()
        const value = [{ categoryName: "Home", categoryId: "" }].concat(result.data)
        setListOfSections(value)
    }

    const GetLeftArrow = () => {
        if (isBiggerThanWindowWidth) {
            setLeftArrow(<div className={canScrollLeft ? styles.left_arrow : styles.left_arrow_disabled}
                onClick={() => scroll(-20)}>
                <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'}
                    className={canScrollLeft ? styles.arrow : styles.arrow_disable} />
            </div>)
        }
        else {
            setLeftArrow(null)
        }
    }

    const GetSectionElementsForm = () => {
        setSectionElementsForm(<div ref={sectionElements} className={isBiggerThanWindowWidth ? styles.section_elements_scrolled : styles.section_elements}>
            {listOfSections.map((section, index) => {
                return <div key={index} onClick={() => { setCurrentMenuElement(section?.categoryName); setSelectedCategory(section) }}
                    className={styles.horizontal_menu_element}>
                    <HorizontalAdminMenuElement name={section?.categoryName} active={section?.categoryName === currentMenuElement} />
                </div>
            })}
        </div>)
    }

    const GetRightArrow = () => {
        if (isBiggerThanWindowWidth) {
            setRightArrow(<div className={canScrollRight ? styles.right_arrow : styles.right_arrow_disabled}
                onClick={() => scroll(20)}>
                <ReactSVG src={process.env.PUBLIC_URL + '/icons/Arrow.svg'}
                    className={canScrollRight ? styles.arrow : styles.arrow_disable} />
            </div>)
        }
        else {
            setRightArrow(null)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        GetSectionElementsForm()
    }, [sectionElements, canScrollLeft, canScrollRight, listOfSections, currentMenuElement])

    useEffect(() => {
        CheckIsBiggerThanWindowWidth()
    }, [sectionElements, sectionElementsForm, listOfSections])

    useEffect(() => {
        GetLeftArrow()
        GetRightArrow()
    }, [isBiggerThanWindowWidth, canScrollLeft, canScrollRight])

    return (
        <div>
            <div className={styles.new_article_area}>
                <div className={styles.section_name}>
                    {
                        t(`AdminPage.VerticalAdminMenu.${currentMenuElement}`) === `AdminPage.VerticalAdminMenu.${currentMenuElement}`
                            ? currentMenuElement
                            : t(`AdminPage.VerticalAdminMenu.${currentMenuElement}`)
                    }
                </div>
                <div className={styles.buttons}>
                    {headerButtons.map((button, index) => {
                        return <Button
                            key={index}
                            onClick={button.function}
                            text={button.text}
                            isOutlined={button.isOutlined} />
                    })}
                </div>
            </div>

            <div className={styles.horizontal_menu}>
                {leftArrow}
                {sectionElementsForm}
                {rightArrow}
            </div>
        </div>
    )
}