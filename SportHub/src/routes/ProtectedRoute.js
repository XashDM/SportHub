import {Navigate} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'


function ProtectedRoute({ roles, children }) {
    const { userData } = useAuthStore()
    const role = userData?.isAdmin ? 'admin' : 'user'


    if (!userData) {
        // User is not authenticated, redirect to login page
        return <Navigate  to='/log-in' />
    }

    if (roles && roles.indexOf(role) === -1) {
        return <Navigate  to='/' />
    }

    return children
}

export default ProtectedRoute
