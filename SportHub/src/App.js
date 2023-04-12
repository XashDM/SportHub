import {BrowserRouter, Route, Routes} from 'react-router-dom'

import RegistrationPage from "./pages/Registration"
import AuthorizationPage from "./pages/Authorization"
import HomePage from "./pages/Home"
import ProtectedRoute from "./routes/ProtectedRoute"
import ErrorPage from "./pages/Error"
import AdminPage from "./pages/Admin"

import "./styles/base.scss"
import {ROUTES} from "./routes/routes"




function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={ROUTES.HOME} element={
                    <ProtectedRoute roles={["admin", "user"]}>
                        <HomePage/>
                    </ProtectedRoute>
                } />

                <Route exact path={ROUTES.ADMIN} element={
                    <AdminPage />
                } />{/* <ProtectedRoute roles={["admin"]}>
                    </ProtectedRoute>*/}

                    <Route exact path={ROUTES.SIGNUP} element={<RegistrationPage/>} />
                    <Route exact path={ROUTES.LOGIN} element={<AuthorizationPage/>} />
                    <Route exact path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
