import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { useState } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({
    token: null,
    isAdmin: null,
    userId: null
  })

  const login = (token, userId, isAdmin) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isAdmin', isAdmin)
    setUserLoggedIn({ token: token, userId: userId, isAdmin: isAdmin })
  }
  const logout = (token, userId, isAdmin) => {
    localStorage.removeItem('token', token)
    localStorage.removeItem('isAdmin', isAdmin)
    setUserLoggedIn({ token: null, userId: null, isAdmin: false })
  }
  return (
    <AuthContext.Provider value={{
      token: userLoggedIn.token,
      isAdmin: userLoggedIn.isAdmin,
      userId: userLoggedIn.userId,
      login: login,
      logout: logout
    }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthContext.Provider >
  )
}

export default App
