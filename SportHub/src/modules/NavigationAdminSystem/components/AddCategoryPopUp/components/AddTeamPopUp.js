import PopUpAddCategoryStyles from "../styles/AddCategoryPopUpStyles"
import Button from "../../../../../ui/Button"
import styles from "../styles/style.module.scss"
import { useState } from "react"
import Input from "../../../../../ui/Input/components/Input"

function PopUpAddTeam({activeSubCategory,open, handleAdd, handleClose}) {
    const [value,setValue] = useState("")

    const addTeam = () => {
        handleAdd(activeSubCategory,value)
    }

    return (
        <div>
            <PopUpAddCategoryStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <h1>Add new team</h1>
                    <Input placeholder={"Name your menu item"} label={"Name"} isVisible={true} onChange={(event) => setValue(event.target.value)}/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text="Cancel"></Button>
                    <Button onClick={addTeam} text="Add"></Button>
                </div>
            </PopUpAddCategoryStyles>
        </div>
    )
}

export default PopUpAddTeam