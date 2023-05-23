import { Snackbar, styled } from "@mui/material"


const FlashMessageStyles = styled(Snackbar)(() => ({
    "& .MuiSnackbarContent-root": {
        backgroundColor: "#FFFFFF",
        color: '#000000',
        borderRadius: 0,
        padding: 0,
    },
}))

export default FlashMessageStyles
