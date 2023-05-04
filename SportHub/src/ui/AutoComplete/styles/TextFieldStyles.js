import {TextField, styled} from "@mui/material"

const TextFieldStyles = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#EDEDED',
        },
        '&:hover fieldset': {
            borderColor: '#E02232',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#C80515',
        },
    },
})

export default TextFieldStyles