import React from "react"
import AuthContainer from "../../../components/AuthContainer"
import ForgotPasswordForm from "../../../modules/ForgotPasswordForm"


export default function PasswordResetPage(){
    return(
        <AuthContainer isLogIn={true}>
            <ForgotPasswordForm />
        </AuthContainer>
    )
}
