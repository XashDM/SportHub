import React from 'react'
import GoogleLogin from 'react-google-login'

function GoogleLoginButton({ onSuccess, onFailure }){
    const clientId = '1053346154092-0ht8fsk771fsnn1lvd5a94e3r5etphle.apps.googleusercontent.com'

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLoginButton
