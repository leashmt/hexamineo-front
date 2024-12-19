import {Route, Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const PrivateRoute = ({element, allowedRoles, ...rest}) => {
    const token = localStorage.getItem('token')
    console.log(token)

    if (!token) {
        return <Navigate to="/error/401" />
    }

    const decodedToken = jwtDecode(token)
    const userRole = decodedToken.role
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/error/403"/>
    }

    return element
}

export default PrivateRoute