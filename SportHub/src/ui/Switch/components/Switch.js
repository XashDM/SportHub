import {FormControlLabel} from '@mui/material'
import SwitchStyles from '../styles/SwitchStyles'
import { useTranslation } from "react-i18next"

function Switch({ onChange, checked }) {
    const { t } = useTranslation()
    let label = t('AdminPage.LanguagesManagement.HideSwitchCaption')
    if (checked) {
        label = t('AdminPage.LanguagesManagement.ShowSwitchCaption')
    }
    return (
        <FormControlLabel
            control={
                <SwitchStyles
                    checked={checked}
                    onChange={onChange}
                />}
            label={label} />
    )
}

export default Switch
