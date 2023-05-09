import styles from "../styles/style.module.scss"
export default function SliderNavigation({ cards, currentCardIdx,setCurrentCardIdx}){
    function onNextClick(){
        setCurrentCardIdx((currentCardIdx + 1) % cards.length)
    }

    function onPrevClick(){
        setCurrentCardIdx((currentCardIdx - 1 + cards.length) % cards.length)
    }

    return (
        <div className={styles.container}>
            <img className={styles.arrow}
                 alt={"prev"}
                 onClick={currentCardIdx === 0 ? null : onPrevClick}
                 src={currentCardIdx === 0 ? "/icons/ArrowICircle.svg" : "/icons/ArrowInCircleActive.svg"}/>

            <div className={styles.digits_container}>
            {cards.map((image, index) => (
                <button
                    onClick={() => setCurrentCardIdx(index)}
                    key={index}
                    className={`${currentCardIdx === index ? styles.active : ""} ${styles.digit}`}
                >
                    {index < 9 ? `0${index + 1}` : index + 1}
                </button>
            ))}
            </div>

            <img className={`${styles.arrow} ${styles.arrow_next}`}
                 alt={"next"}
                 onClick={currentCardIdx === cards.length - 1 ? null : onNextClick}
                 src={currentCardIdx === cards.length - 1 ? "/icons/ArrowInCircle.svg" : "/icons/ArrowInCircleActive.svg"}/>
        </div>
    )
}
