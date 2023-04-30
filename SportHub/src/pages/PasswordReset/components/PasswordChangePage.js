import React from "react"
import AuthContainer from "../../../components/AuthContainer"
import ChangePasswordForm from "../../../modules/ChangePasswordForm"


export default function PasswordChangePage(){
    return(
        <AuthContainer isLogIn={true}>
            <ChangePasswordForm />
        </AuthContainer>
    )
}
