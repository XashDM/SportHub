import PopUpAddCategoryStyles from "../styles/AddCategoryPopUpStyles";
import Button from "../../../../../ui/Button";
import styles from "../styles/style.module.scss"
import { useState } from "react";
import Input from "../../../../../ui/Input/components/Input";

function PopUpAddSubCategory({activeCategory,open, handleAdd, handleClose}) {
    const [value,setValue] = useState("")

    const addSubCategory = () => {
        handleAdd(activeCategory,value)
    }

    return (
        <div>
            <PopUpAddCategoryStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <h1>Add new subcategory</h1>
                    <Input placeholder={"Name your menu item"} label={"Name"} isVisible={true} onChange={(event) => setValue(event.target.value)}/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text="Cancel"></Button>
                    <Button onClick={addSubCategory} text="Add"></Button>
                </div>
            </PopUpAddCategoryStyles>
        </div>
    )
}

export default PopUpAddSubCategory