import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Dashboard/Admin';
import Coordinator from './pages/Dashboard/Coordinator';
import Participant from './pages/Dashboard/Participant';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedRole = localStorage.getItem('role');
    if (storedLogin === 'true' && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/forgot" element={<ForgotPassword/>}/>
 
        <Route
          path="/admin"
          element={isLoggedIn && role === 'admin' ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/coordinator"
          element={isLoggedIn && role === 'coordinator' ? <Coordinator /> : <Navigate to="/login" />}
        />
        <Route
          path="/participant"
          element={isLoggedIn && role === 'participant' ? <Participant /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
