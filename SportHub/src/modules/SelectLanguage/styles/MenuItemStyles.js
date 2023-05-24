import { MenuItem, styled } from "@mui/material"

const MenuItemStyles = styled(MenuItem)({
    fontFamily: "var(--font-style-open-sans)",
    "&:hover": {
        backgroundColor: "var(--color-red-regular-transparent)",
        color: "var(--color-red-regular)",
        cursor: "pointer",
    },
    "&:selected": {
        backgroundColor: "var(--color-red-regular-transparent)",
        color: "var(--color-red-regular)",
      },
})

export default MenuItemStyles