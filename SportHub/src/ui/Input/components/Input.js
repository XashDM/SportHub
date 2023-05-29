import styles from "../styles/style.module.scss"
import {FormControl} from "@mui/material"
import InputStyles from "../styles/InputStyles"
import Label from "./Label"
import { useTranslation } from "react-i18next"

function Input({placeholder, label, onClick, isVisible=true, onChange, ...props}){
    const { t } = useTranslation()
    return(
        <FormControl variant="standard" className={styles.form__control} {...props}>
            {onClick != null && (
                <button className={styles.link} onClick={onClick}>
                    <small>{t('AuthContainer.QuestionForgotPassword')}</small>
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
