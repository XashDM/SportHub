import { MenuItem, styled } from "@mui/material"

const MenuItemStyles = styled(MenuItem)({
    fontFamily: "var(--font-style-open-sans)",
    color: "var(--color-dark-text-color)",
    "&:hover": {
        backgroundColor: "var(--color-red-regular-transparent)",
        color: "var(--color-red-regular)",
        cursor: "pointer",
    },
    "&.Mui-selected": {
        backgroundColor: "var(--color-red-regular-transparent)",
        color: "var(--color-red-regular)",
        "&.Mui-focusVisible": {
            background: "var(--color-red-regular-transparent)"
        },
        "&:hover": {
            backgroundColor: "var(--color-red-regular-transparent)",
            color: "var(--color-red-regular)",
            cursor: "pointer",
        },
    }
})

export default MenuItemStyles