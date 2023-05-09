import BigCard from "../../../ui/BigCard"
import Card from "../../../ui/Card"
import {useEffect, useRef, useState} from "react"
import styles from "../styles/style.module.scss"
import mainArticlesRequest from "../helpers/mainArticlesRequest"
import SliderNavigation from "./SliderNavigation"

function MainArticlesSlider() {
    const [cardsState, setCardsState] = useState([])
    const [currentCardIdx, setCurrentCardIdx] = useState(0)
    const [intervalId, setIntervalId] = useState(null)

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
        const cards =  mainArticlesRequest()
        setCardsState(cards)


        // When component unmount
        return () => stopAutoScroll()
    }, [])

    return (
        <div className={styles.container}
             onMouseEnter={stopAutoScroll}
             onMouseLeave={startAutoScroll}
        >
            <div className={styles.big_card_container}>
                <BigCard
                    {...cardsState[currentCardIdx]}
                    idx = {currentCardIdx}
                />

                <SliderNavigation
                    cards={cardsState}
                    currentCardIdx={currentCardIdx}
                    setCurrentCardIdx={setCurrentCardIdx}
                />
            </div>

            <div className={styles.small_cards_container}>
                {cardsState.filter((article, index) => index !== currentCardIdx).map((cardObj, idx) => (
                    <Card
                        {...cardObj}
                        key={idx}
                        idx={idx+1}
                    />
                ))}
            </div>
        </div>
    )
}

export default MainArticlesSlider
