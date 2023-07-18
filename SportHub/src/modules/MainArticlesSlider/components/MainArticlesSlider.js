import BigCard from "../../../ui/BigCard"
import Card from "../../../ui/Card"
import {useEffect, useState} from "react"
import styles from "../styles/style.module.scss"
import mainArticlesRequest from "../helpers/mainArticlesRequest"
import SliderNavigation from "./SliderNavigation"
import {useTranslation} from "react-i18next"
import {ROUTES} from "../../../routes/routes"
import {useNavigate} from "react-router-dom"

function MainArticlesSlider() {
    const [cardsState, setCardsState] = useState(null)
    const [currentCardIdx, setCurrentCardIdx] = useState(0)
    const [intervalId, setIntervalId] = useState(null)
    const { i18n } = useTranslation()
    const navigate = useNavigate()

    function noArticlesFromBackend(){
        return !cardsState || cardsState.length === 0
    }

    function startAutoScroll(){
        if(intervalId === null){
            console.log("State: ", cardsState)

            const id = setInterval(() => {
                setCurrentCardIdx(prevIdx => {
                    const newIdx = (prevIdx + 1)

                    if(cardsState.length !== 0){
                        return newIdx % cardsState.length
                    }

                    return newIdx
                })
            }, 3000)

            setIntervalId(id)
        }
    }
    function stopAutoScroll(){
        clearInterval(intervalId)
        setIntervalId(null)
    }

    useEffect( () => {

        setTimeout(async () => {
            const cards =  await mainArticlesRequest(i18n.language)

            if(cards.length > 5){
                cards.length = 5
            }
            setCardsState(cards)

        },0)


        return () => stopAutoScroll()
    }, [])

    if(noArticlesFromBackend()) return null

    return (
        <div className={styles.container}
             onMouseEnter={stopAutoScroll}
             onMouseLeave={startAutoScroll}
        >
            <div className={styles.big_card_container}>
                <BigCard
                    {...cardsState[currentCardIdx]}
                    {...cardsState[currentCardIdx].info}
                    idx = {currentCardIdx}
                />

                <SliderNavigation
                    cards={cardsState}
                    currentCardIdx={currentCardIdx}
                    setCurrentCardIdx={setCurrentCardIdx}
                />
            </div>

            <div className={styles.small_cards_container}>
                {cardsState.filter((article, index) => index !== currentCardIdx).map((article, idx) => (
                    <Card
                        {...article}
                        {...article.info}
                        key={idx}
                        idx={idx+1}
                        onClick={() => {navigate(ROUTES.ARTICLE.replace(':articleId', article.articleId))}}
                    />
                ))}
            </div>
        </div>
    )
}

export default MainArticlesSlider
