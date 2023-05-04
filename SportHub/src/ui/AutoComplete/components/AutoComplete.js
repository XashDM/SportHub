import React, {useEffect, useState} from 'react'
import TextFieldStyles from "../styles/TextFieldStyles"
import Autocomplete from '@mui/material/Autocomplete'
import styles from "../styles/style.module.scss"
import ListBoxComponent from "./ListBoxComponent"
import {Box} from "@mui/material"

export default function AutoComplete({label, width, disabled, value, setValue, options, areOptionsObjects=false, optionLable=null, propertyToCompare=null, required=false}){

    const [autocompleteValue, setAutocompleteValue] = useState(value)
    useEffect(() => setValue(autocompleteValue), [autocompleteValue])

    if (areOptionsObjects === true && optionLable !== null && propertyToCompare !== null){
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
                        isOptionEqualToValue={(option, value) => option[propertyToCompare] === value[propertyToCompare]}
                        getOptionLabel={(option) => option[optionLable]}
                        renderInput={(params) => <TextFieldStyles disabled={disabled} {...params} />}
                    />
                </div>
            </div>
        )
    }

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
                    renderInput={(params) => <TextFieldStyles required={required} disabled={disabled} {...params} />}
                />
            </div>
        </div>
    )
}