import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RegistrationPage from "./pages/Registration"

import AuthorizationPage from "./pages/Authorization"
import HomePage from "./pages/Home"

import "./styles/base.scss"


function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route exact path="/sign-up" element={<RegistrationPage/>} />
                <Route exact path="/log-in" element={<AuthorizationPage/>} />
            </Routes>
        </BrowserRouter>

    )
}

export default App
