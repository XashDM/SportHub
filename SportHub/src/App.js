import {BrowserRouter, Route, Routes} from 'react-router-dom'

import RegistrationPage from "./pages/Registration"
import AuthorizationPage from "./pages/Authorization"
import HomePage from "./pages/Home"
import ProtectedRoute from "./routes/ProtectedRoute"
import ErrorPage from "./pages/Error"
import AdminPage from "./pages/Admin"

import "./styles/base.scss"




function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    <ProtectedRoute roles={["admin", "user"]}>
                        <HomePage/>
                    </ProtectedRoute>
                } />

                <Route exact path="/admin" element={
                    <ProtectedRoute roles={["admin"]}>
                        <AdminPage/>
                    </ProtectedRoute>
                } />

                    <Route exact path="/sign-up" element={<RegistrationPage/>} />
                    <Route exact path="/log-in" element={<AuthorizationPage/>} />
                    <Route exact path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
