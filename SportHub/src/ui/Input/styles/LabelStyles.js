import {InputLabel, styled} from "@mui/material"

const LabelStyles = styled(InputLabel)(({ theme }) => ({
    textTransform: 'uppercase',
    color: '#000',
    '&.Mui-focused': {
        color: '#000',
    },

    '&.Mui-error': {
        color: '#000',
    },
}))

export default LabelStyles
