import styles from "../styles/style.module.scss"
import {FormControl} from "@mui/material"
import InputStyles from "../styles/InputStyles"
import Label from "./Label"


function Input({placeholder, label, onClick, isVisible=true, onChange, ...props}){

    return(
        <FormControl variant="standard" className={styles.form__control} {...props}>
            {onClick != null && (
                <button className={styles.link} onClick={onClick}>
                    <small>Forgot password?</small>
                </button>
            )}
            <Label>{label}</Label>
            <InputStyles
                placeholder={placeholder}
                onChange={onChange}
                type= {isVisible ? "text" : "password"}/>
        </FormControl>
    )
}

export default Input
