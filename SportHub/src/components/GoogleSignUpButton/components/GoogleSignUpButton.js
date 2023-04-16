import React from 'react'
import GoogleLogin from 'react-google-login'
import jwtDecode from 'jwt-decode'

const GoogleSignUpButton = ({ onSuccess, onFailure }) => {
    const clientId = '1053346154092-0ht8fsk771fsnn1lvd5a94e3r5etphle.apps.googleusercontent.com'

    const handleSuccess = (response) => {
        const { id_token } = response.tokenObj
        const decoded = jwtDecode(id_token)

        onSuccess({
            email: decoded.email,
            name: decoded.name,
            googleId: decoded.sub,
        })
    }

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign up with Google"
            onSuccess={handleSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            prompt="consent"
            responseType="id_token"
            scope="email profile openid"
        />
    )
}

export default GoogleSignUpButton
