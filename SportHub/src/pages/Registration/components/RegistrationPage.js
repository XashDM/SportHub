import React from "react"
import AuthContainer from "../../../components/AuthContainer"
import SignUpForm from "../../../modules/SignUpForm"

export default function RegistrationPage(){
    return(
        <AuthContainer>
            <SignUpForm />
        </AuthContainer>
    )
}
