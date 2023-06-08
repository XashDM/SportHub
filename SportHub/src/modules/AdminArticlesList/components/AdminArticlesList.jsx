import React, {useState} from "react"
import styles from "../styles/styles.module.scss"
import HorizontalCard from "./HorizontalCard"
import AutoComplete from "../../../ui/AutoComplete"
import OPTIONS from "../../AdminMainArticlesSection/constants/Options"

function AdminArticlesList({}) {
    const [team, setTeam] = useState()
    const [subcategory, setSubcategory] = useState()
    const [isPublished, setIsPublished] = useState()
    const [currentAutocompleteIdx, setCurrentAutocompleteIdx] = useState(0)

    const articles =  [
        {
            imageUrl: "https://api.time.com/wp-content/uploads/2017/03/panda-black-white-study.jpg",
            mainText: "The Black Panther team has emerged as an unstoppable force in the world of sports, captivating audiences with their awe-inspiring athleticism, unrivaled skill, and unyielding determination. This talented group of individuals has not only redefined the game but has also shattered records and established themselves as true champions. In this article, we will delve into the extraordinary journey of the Black Panther team, examining their rise to prominence, their remarkable achievements, and the enduring legacy they have created.",
            title: "Dominant Black Panther Team Continues to Reign Supreme in the Sporting World",
            isPublished: false,
            location: "Kiev",
            subCategory: "AFC South"
        },
        {
            imageUrl: "https://www.macmillandictionaryblog.com/wp-content/uploads/2019/07/148640-1024x680.jpg",
            mainText: "Experience the thrill and excitement as the Lightning Strikers dominate the soccer field with their lightning-fast speed, impeccable teamwork, and unmatched goal-scoring abilities. In this article, we explore the rise of the Lightning Strikers, their unforgettable victories, and the electrifying legacy they leave behind.",
            title: "The Lightning Strikers: Unleashing the Power of Speed",
            isPublished: true,
            location: "Manchester",
            subCategory: "Premier League"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1594616389213-f3c7ce522896?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
            mainText: "Discover the unstoppable force that is the Phoenix Warriors! With their fiery determination, unyielding strength, and exceptional skills, they have conquered the world of martial arts. This article takes you on an exhilarating journey through the rise of the Phoenix Warriors, their relentless battles, and the legacy they have forged in the realm of combat sports.",
            title: "Phoenix Warriors: Rising from Ashes to Conquer",
            isPublished: true,
            location: "Tokyo",
            subCategory: "NFC West"
        }
    ]
    function convertArticlesToCards(){
        return articles.map((article, idx) => <HorizontalCard {...article} key={idx}/>)
    }
    function getAutocomplete(value, setter, defaultValue){
        const options = [{name: defaultValue, id: 1}, ...OPTIONS]

        return (
            <AutoComplete
                value={value}
                setValue={setter}
                options={options}
                defaultValue={options[0]}
                areOptionsObjects={true}
                optionLable={"name"}
                propertyToCompare={"id"} />
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.options_container}>
                {getAutocomplete(subcategory, setSubcategory, "All Subcategories")}
                {getAutocomplete(team, setTeam, "All teams")}
                {getAutocomplete(isPublished, setIsPublished, "All")}
            </div>
            <div className={styles.list_container}>
                {convertArticlesToCards()}
            </div>
        </div>
    )
}

export default AdminArticlesList
