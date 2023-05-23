import { Box, styled } from "@mui/material"

const BoxStyles = styled(Box)(() => ({
    display: "flex", 
    alignItems: "center",
    fontFamily: "Open Sans",
    "& > img": { 
        marginRight: 10, 
        flexShrink: 0,
    }, 
    "& .MuiCheckbox-root": { 
        marginLeft: "auto",
        paddingRight: 0,
    },
}))

export default BoxStyles