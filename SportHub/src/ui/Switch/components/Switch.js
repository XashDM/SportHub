import {FormControlLabel} from '@mui/material'
import SwitchStyles from '../styles/SwitchStyles'

function Switch({ onChange, checked }) {
    let label = 'Hide'
    if (checked) {
        label = 'Show'
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
