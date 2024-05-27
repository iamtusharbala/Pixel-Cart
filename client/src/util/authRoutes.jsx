import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export const RequiredAuth = ({ adminRequired = false, children }) => {
    const authContext = React.useContext(AuthContext)
    const location = useLocation()
    const token = localStorage.getItem('token')
    const isAdmin = localStorage.getItem('isAdmin') === "true"
    if (!token || token === '') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminRequired && !isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children
}

export default RequiredAuth