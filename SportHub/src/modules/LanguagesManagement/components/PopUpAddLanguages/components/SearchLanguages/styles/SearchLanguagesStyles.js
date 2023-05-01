import { Autocomplete, styled } from "@mui/material"

const SearchLanguagesStyles = styled(Autocomplete)(() => ({
    borderRadius: 0,
    "& .MuiAutocomplete-inputRoot": {
        width: 300,
        borderRadius: 0,
        fontFamily: "Open Sans",
        textAlign: "left",
    },
    "& .MuiAutocomplete-tag": {
        backgroundColor: "#DAE9FD",
        fontFamily: "Open Sans",
        fontSize: 14,
        fontWeight: 600,
        borderRadius: 2,
        "& .MuiChip-label": {
            paddingLeft: 6,
            paddingRight: 6,
        },
        "& .MuiChip-deleteIcon": {
            marginLeft: "auto",
        },
    },
    "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-notchedOutline": { // inactive state
            borderWidth: "1px",
            borderColor: "#D4D9E2",
        },
        "&:hover fieldset": { // hover state
            borderWidth: "1px",
            borderColor: "#D4D9E2",
        },
        "&.Mui-focused fieldset": { // focused state
            borderWidth: "1px",
            borderColor: "#D4D9E2",
        },
    },
}))

export default SearchLanguagesStyles