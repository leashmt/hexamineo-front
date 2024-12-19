import {Navigate} from "react-router-dom"
import {useContext} from "react"
import {UserContext, userContext} from "../context/UserContext"

const PermissionRoute = ({ children, allowedRoles}) => {
    const {user} = useContext(UserContext)

    if (!user) {
        return <Navigate to="/auth"/>
    }

    if (!allowedRoles.includes(user.role)) {
        return <div>Vous n'avez pas la permission d'accéder à cette page.</div>
    }

    return children
}

export default PermissionRoute