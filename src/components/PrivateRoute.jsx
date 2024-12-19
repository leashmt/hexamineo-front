import {Route, Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const PrivateRoute = ({element, allowedRoles, ...rest}) => {
    const token = localStorage.getItem('token')
    console.log(token)

    if (!token) {
        return <Navigate to="/auth" />
    }

    const decodedToken = jwtDecode(token)
    const userRole = decodedToken.role
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/access-denied"/>
    }

    return element
}

export default PrivateRoute