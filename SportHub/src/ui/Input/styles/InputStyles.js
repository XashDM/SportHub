import {InputBase, styled} from "@mui/material"

const InputStyles = styled(InputBase)(({ theme }) => ({
    width: '100%',

    'label + &': {
        marginTop: theme.spacing(3),
    },

    '& .MuiInputBase-input': {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: "white",
        border: '1.5px solid #DCE0E6',
        padding: '10px 12px',
        // color: '#DCE0E6',

        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
            'color'
        ]),

        '&:hover': {
            borderColor: "#EDEDED",
        },

        '&:focus': {
            boxShadow: `transparent`,
            color: "black",
            borderColor: "#7F7B7B",
        },
    },

    '&.Mui-error .MuiInputBase-input': {
        borderColor: '#D72230',
    },

    '&::placeholder': {
        color: '#DCE0E6',
    },
    '&:not(:placeholder-shown)': {
        color: 'black',
    },

}));

export default InputStyles
