import React, {useEffect, useState} from 'react'
import TextFieldStyles from "../styles/TextFieldStyles"
import Autocomplete from '@mui/material/Autocomplete'
import styles from "../styles/style.module.scss"
import Label from "../../Label"

export default function AutoComplete({label, setValue, disabled, value, areOptionsObjects=false, optionLable=null, propertyToCompare=null, required=false, ...props}){

    const [autocompleteValue, setAutocompleteValue] = useState(value)
    useEffect(() => setValue(autocompleteValue), [autocompleteValue])

    return (
        <div>
            <div className={styles.content}>
                <Label children={label} />
                <Autocomplete
                    {...props}
                    disablePortal={true}
                    sx = {{ width: "100%"}}
                    disabled = {disabled}
                    value = {value}
                    onChange = {(event, newValue) => {setAutocompleteValue(newValue)}}
                    isOptionEqualToValue={(option, value) =>
                        areOptionsObjects === true && optionLable !== null && propertyToCompare !== null
                        ? option[propertyToCompare] === value[propertyToCompare]
                        : option === value}
                    getOptionLabel={(option) =>
                        areOptionsObjects === true && optionLable !== null && propertyToCompare !== null
                            ? option[optionLable] : option}
                    renderInput={(params) => <TextFieldStyles required={required} disabled={disabled} {...params} />}
                    renderOption={(props, option) => <div {...props} className={styles.option}>
                        {areOptionsObjects === true && optionLable !== null && propertyToCompare !== null
                        ? option[optionLable] : option}
                        </div>}
                />
            </div>
        </div>
    )
}
