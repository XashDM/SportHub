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
import PasswordChangePage from "./pages/PasswordReset"
import PasswordResetPage from "./pages/PasswordChange"
import { useEffect } from 'react'
import checkCurrentLanguage from "./helpers/checkCurrentLanguage"
import SearchArticlesPage from './pages/SearchArticles'
import Article from "./pages/Article"

function App() {
    useEffect(() => {
        checkCurrentLanguage()
    })
    return (
        <GoogleOAuthProvider clientId="1053346154092-0ht8fsk771fsnn1lvd5a94e3r5etphle.apps.googleusercontent.com">
        <BrowserRouter>
            <Routes>
                <Route exact path={ROUTES.HOME} element={<HomePage/>} />
                <Route exact path={ROUTES.SEARCH} element={<SearchArticlesPage/>} />
                <Route exact path={ROUTES.ARTICLE} element={<Article/>} />

                <Route exact path={ROUTES.ADMIN} element={
                    <ProtectedRoute roles={["admin"]}>
                        <AdminPage />
                    </ProtectedRoute>
                } />
                <Route exact path={ROUTES.SIGNUP} element={<RegistrationPage/>} />
                <Route exact path={ROUTES.PASSWORD_RESET} element={<PasswordResetPage/>} />
                <Route exact path={ROUTES.PASSWORD_CHANGE} element={<PasswordChangePage/>} />
                <Route exact path={ROUTES.LOGIN} element={<AuthorizationPage/>} />
                <Route exact path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
