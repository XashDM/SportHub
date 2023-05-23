import LabelStyles from "../styles/LabelStyles"

export default function Label({children}){
    return(
        <LabelStyles shrink htmlFor="">
            {children}
        </LabelStyles>
    )
}

