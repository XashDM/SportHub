import { Autocomplete, styled } from "@mui/material"

const SearchbarStyles = styled(Autocomplete)(() => ({
    borderRadius: 0,
    fontFamily: "Open Sans",
    "& .MuiAutocomplete-inputRoot": {
        width: 300,
        borderRadius: 0,
        textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-notchedOutline": { // inactive state
            borderWidth: "0px",
            borderColor: "#D4D9E2",
        },
        "&:hover fieldset": { // hover state
            borderWidth: "0px",
            borderColor: "#D4D9E2",
        },
        "&.Mui-focused fieldset": { // focused state
            borderWidth: "0px",
            borderColor: "#D4D9E2",
        },
    },
}))

export default SearchbarStyles