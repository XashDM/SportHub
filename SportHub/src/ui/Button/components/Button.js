import {Button as MuiButton} from "@mui/material"
import buttonStylesSolid from "../styles/styleSolid"
import buttonStylesOutlined from "../styles/styleOutlined"
function Button({onClick, text, isOutlined}){
    return(
        <MuiButton disableRipple variant="outlined" onClick={onClick}
                 sx={isOutlined ? buttonStylesOutlined : buttonStylesSolid}>
            {text}
        </MuiButton>
    )
}

export default Button
