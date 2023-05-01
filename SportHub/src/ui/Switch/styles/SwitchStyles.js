import { Switch, styled } from "@mui/material"

const borderWidth = 2;

const SwitchStyles = styled(Switch)(() => ({
    padding: 8,
    '& .MuiSwitch-switchBase': {
        transitionDuration: '300ms',
        '&.Mui-checked': {
          color: '#fff',
          '& + .MuiSwitch-track': {
            borderRadius: 22 / 2,
            border: `solid #D4D9E2`,
            borderWidth,
            backgroundColor: '#FFFFFF',
          },
          '& .MuiSwitch-thumb': {
            backgroundColor: '#C80515',
          },
        },
      },
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        border: `solid #D4D9E2`,
        borderWidth,
        backgroundColor: '#FFFFFF',
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        margin: 4,
        width: 12,
        height: 12,
        backgroundColor: '#D4D9E2',
    },
}));

export default SwitchStyles
