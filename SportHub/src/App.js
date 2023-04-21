import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import RegistrationPage from "./pages/Registration"
import AuthorizationPage from "./pages/Authorization"
import HomePage from "./pages/Home"
import ProtectedRoute from "./routes/ProtectedRoute"
import ErrorPage from "./pages/Error"
import AdminPage from "./pages/Admin"

import "./styles/base.scss"
import {ROUTES} from "./routes/routes"
import PasswordResetPage from "./pages/PasswordReset"




function App() {
    return (
        <GoogleOAuthProvider clientId="1053346154092-0ht8fsk771fsnn1lvd5a94e3r5etphle.apps.googleusercontent.com">
        <BrowserRouter>
            <Routes>
                <Route exact path={ROUTES.HOME} element={
                    <ProtectedRoute roles={["admin", "user"]}>
                        <HomePage/>
                    </ProtectedRoute>
                } />

                <Route exact path={ROUTES.ADMIN} element={
                    <ProtectedRoute roles={["admin"]}>
                        <AdminPage />
                    </ProtectedRoute>
                } />

                    <Route exact path={ROUTES.SIGNUP} element={<RegistrationPage/>} />
                    <Route exact path={ROUTES.PASSWORD_RESET} element={<PasswordResetPage/>} />
                    <Route exact path={ROUTES.LOGIN} element={<AuthorizationPage/>} />
                    <Route exact path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
