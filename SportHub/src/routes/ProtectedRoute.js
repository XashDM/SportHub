import {Navigate} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {ROUTES} from "./routes"


function ProtectedRoute({ roles, children }) {
    const { userData } = useAuthStore()
    const role = userData?.isAdmin ? 'admin' : 'user'


    if (!userData) {
        // User is not authenticated, redirect to login page
        return <Navigate  to={ROUTES.LOGIN} />
    }

    if (roles && roles.indexOf(role) === -1) {
        return <Navigate  to={ROUTES.HOME} />
    }

    return children
}

export default ProtectedRoute
