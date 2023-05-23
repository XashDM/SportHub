import { Checkbox, styled } from "@mui/material"

const CheckboxStyles = styled(Checkbox)(() => ({
    "& .MuiSvgIcon-root": {
        color: "#D4D9E2",
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        color: '#D72130',
    },
    '&:hover .MuiSvgIcon-root': {
        color: '#E02431',
        backgroundColor: "transparent",
    },
}))

export default CheckboxStyles