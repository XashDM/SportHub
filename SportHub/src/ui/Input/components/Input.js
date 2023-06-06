import styles from "../styles/style.module.scss"
import {FormControl} from "@mui/material"
import InputStyles from "../styles/InputStyles"
import { useTranslation } from "react-i18next"
import Label from "../../../ui/Label"

function Input({ placeholder, label, onClick, isVisible = true, onChange, value, ...props}){
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
                //type= {isVisible ? "text" : "password"}
                value={value}/>
        </FormControl>
    )
}

export default Input
