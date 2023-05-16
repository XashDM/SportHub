import { Dialog, styled } from "@mui/material"

const PopUpAddLanguagesStyles = styled(Dialog)(() => ({
    "& .MuiDialog-paper": {
        backgroundColor: "#FFFFFF",
        color: '#000000',
        borderRadius: 0,
        fontFamily: 'Open Sans',
        overflowY: 'visible',
    },
    "& .MuiDialog-container": {
        backdropFilter: 'blur(5px)',
    },
}))

export default PopUpAddLanguagesStyles