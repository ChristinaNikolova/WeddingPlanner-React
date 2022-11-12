import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './contexts/authContext';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Logout from './components/Auth/Logout/Logout';
import NotFound from './components/NotFound/NotFound';

import './App.css';

function App() {
  const [auth, setAuth] = useState({});

  const userLogin = (data) => {
    console.log(12);
    setAuth(data);
  }

  return (
    <AuthContext.Provider value={{ auth, userLogin }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
