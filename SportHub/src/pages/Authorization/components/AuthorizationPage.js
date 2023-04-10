import React from "react"
import AuthContainer from "../../../components/AuthContainer"
import LoginForm from "../../../modules/LoginForm"

export default function AuthorizationPage(){
    return(
        <AuthContainer isLogIn={true}>
            <LoginForm />
        </AuthContainer>
    )
}
