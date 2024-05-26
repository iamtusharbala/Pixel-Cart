import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'

export const authRoutes = ({ children }) => {
    const authContext = React.useContext(AuthContext)
    const location = useLocation()
    const token = localStorage.getItem('token')
    console.log(token);
    if (!token || token === '') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children
}