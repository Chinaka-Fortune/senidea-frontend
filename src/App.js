import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { validateToken } from './utils/api';
import Home from './home/Home';
import Contact from './contact/Contact';
import About from './about/About';
import Blog from './blog/Blog';
import Donation from './donation/Donation';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import DashBoard from './dashBoard/DashBoard';
import Login from './dashBoard/Login';
import SignUp from './dashBoard/dashComponent/SignUp';
import EditBlog from './dashBoard/dashComponent/EditBlog';
import PartnershipForm from './home/homeComponents/PartnershipForm';
import VolunteerForm from './home/homeComponents/VolunteerForm';

export const AuthContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      console.debug('Checking auth state:', { token: token ? token.substring(0, 10) + '...' : 'No token' });
      if (token) {
        try {
          const response = await validateToken();
          console.debug('Token validation response:', response);
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Token validation failed:', {
            message: err.message,
            stack: err.stack,
            name: err.name,
            status: err.status || 'N/A',
          });
          localStorage.removeItem('access_token');
          setIsLoggedIn(false);
        }
      } else {
        console.debug('No token found, setting isLoggedIn to false');
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/partnership" element={<PartnershipForm />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
          <Route path="/admin-dashboard" element={isLoggedIn ? <DashBoard /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;