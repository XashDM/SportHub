import React, {useEffect, useState} from 'react'
import TextFieldStyles from "../styles/TextFieldStyles"
import Autocomplete from '@mui/material/Autocomplete'
import styles from "../styles/style.module.scss"
import ListBoxComponent from "./ListBoxComponent"

export default function AutoComplete({label, width, disabled, value, setValue, options, areOptionsObjects=false, optionLable=null, propertyToCompare=null, required=false}){

    const [autocompleteValue, setAutocompleteValue] = useState(value)
    useEffect(() => setValue(autocompleteValue), [autocompleteValue])

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.lable}>{label}</div>
                <Autocomplete
                    disabled = {disabled}
                    options = {options}
                    value = {value}
                    onChange = {(event, newValue) => {setAutocompleteValue(newValue)}}
                    ListboxComponent={ListBoxComponent}
                    sx = {{ width: {width} }}
                    isOptionEqualToValue={(option, value) =>
                        areOptionsObjects === true && optionLable !== null && propertyToCompare !== null
                        ? option[propertyToCompare] === value[propertyToCompare]
                        : option === value}
                    getOptionLabel={(option) =>
                        areOptionsObjects === true && optionLable !== null && propertyToCompare !== null
                            ? option[optionLable] : option}
                    renderInput={(params) => <TextFieldStyles required={required} disabled={disabled} {...params} />}
                />
            </div>
        </div>
    )
}