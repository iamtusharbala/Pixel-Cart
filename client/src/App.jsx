import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/User/Profile';
import Dashboard from './Pages/Admin/Dashboard';
import NavBar from './Components/NavBar/NavBar';
import { AuthContext } from './context/AuthContext';
import { RequiredAuth } from './util/authRoutes';
import Orders from './Pages/User/Orders';
import Cart from './Pages/User/Cart';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({
    token: null,
    userId: null,
    isAdmin: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (token && userId) {
      setUserLoggedIn({ token, userId, isAdmin });
    }
  }, []);

  const login = (token, userId, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin.toString());
    setUserLoggedIn({ token, userId, isAdmin });
  };

  const logout = () => {
    setUserLoggedIn({ token: null, userId: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{
      token: userLoggedIn.token,
      isAdmin: userLoggedIn.isAdmin,
      userId: userLoggedIn.userId,
      login: login,
      logout: logout
    }}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<RequiredAuth><Profile /></RequiredAuth>} />
        <Route path='/admin-dashboard' element={<RequiredAuth adminRequired={true}><Dashboard /></RequiredAuth>} />
        <Route path='/orders' element={<RequiredAuth ><Orders /></RequiredAuth>} />
        <Route path='/cart' element={<RequiredAuth ><Cart /></RequiredAuth>} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
