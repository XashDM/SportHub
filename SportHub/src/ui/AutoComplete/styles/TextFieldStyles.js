import {TextField, styled} from "@mui/material"

const TextFieldStyles = styled(TextField)({
    '& disabled': {
        borderColor: 'orange'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#EDEDED',
            borderRadius: 0
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