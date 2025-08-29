import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import NavBarLogoImg from './navBarImage/NavLogoImg.png';
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-md bg-white sticky-top w-100">
      <div className="container-fluid d-flex align-item-center justify-content-between px-lg-5">
        <div className="navbar-brandDiv">
          <NavLink className="navbar-brand" to="/">
            <img src={NavBarLogoImg} alt="Senidea Logo" className="w-100 h-100" />
          </NavLink>
        </div>

        <div>
          <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        </div>

        <div className="d-none d-md-block">
          <div>
            <ul className="navbar-nav nav-underline d-flex justify-content-between">
              <li className="nav-item  list-style-none">
                <NavLink
                  className="text-decoration-none fs-5 nav-link"
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#2A2E94" : "black",
                    fontWeight: isActive ? "bolder" : "normal",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item  list-style-none">
                <NavLink
                  className="text-decoration-none fs-5  nav-link"
                  to="/about"
                  style={({ isActive }) => ({
                    color: isActive ? "#2A2E94" : "black",
                    fontWeight: isActive ? "bolder" : "normal",
                  })}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item  list-style-none">
                <NavLink
                  className="text-decoration-none fs-5 nav-link"
                  to="/blog"
                  style={({ isActive }) => ({
                    color: isActive ? "#2A2E94" : "black",
                    fontWeight: isActive ? "bolder" : "normal",
                  })}
                >
                  Blog
                </NavLink>
              </li>
              <li className="nav-item  list-style-none">
                <NavLink
                  className="text-decoration-none fs-5 nav-link"
                  to="/contact"
                  style={({ isActive }) => ({
                    color: isActive ? "#2A2E94" : "black",
                    fontWeight: isActive ? "bolder" : "normal",
                  })}
                >
                  Contact Us
                </NavLink>
              </li>

              <li className="nav-item  list-style-none">
                <NavLink
                  className="text-decoration-none fs-5 nav-link"
                  to="/ourimpact"
                  style={({ isActive }) => ({
                    color: isActive ? "#2A2E94" : "black",
                    fontWeight: isActive ? "bolder" : "normal",
                  })}
                >
                  Our Impact
                </NavLink>
              </li>

              {location.pathname === "/admin-dashboard" && (
                <li className="nav-item me-3 list-style-none">
                  <NavLink
                    className="text-decoration-none fs-5 nav-link"
                    to="/admin-dashboard"
                    style={({ isActive }) => ({
                      color: isActive ? "#2A2E94" : "black",
                      fontWeight: isActive ? "bolder" : "normal",
                    })}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <NavLink to="/donation" className="py-2 px-4 text-white rounded text-decoration-none fw-bold generalBtn d-none d-md-block">
          Donation
        </NavLink>
      </div>

      <div className="w-50 d-md-none">
        <div className="collapse nav-collapse pb-3 phone-nav-color phoneBorder" id="navbarNav" nav-collapse-toggle='hide'>
          <ul className="navbar-nav nav-underline phone-transform">
            <li className="fs-5 py-2 ps-3 hoverText"> 
            <NavLink className='text-decoration-none '
            to='/'
            style={({isActive}) => ({color:isActive ? "#2a2e94" : "white", fontWeight: isActive ? "bolder" : "normal"})}>
              Home
            </NavLink>
            </li>

              <li className="fs-5 py-2 ps-3 hoverText"> 
            <NavLink className='text-decoration-none'
            to='/about'
            style={({isActive}) => ({color:isActive ? "#2a2e94" : "white", fontWeight: isActive ? "bolder" : "normal"})}>
              About Us
            </NavLink>
              </li>
              <li className="fs-5 py-2 ps-3 hoverText"> 
            <NavLink className='text-decoration-none'
            to='/blog'
            style={({isActive}) => ({color:isActive ? "#2a2e94" : "white", fontWeight: isActive ? "bolder" : "normal"})}>
              Blog
            </NavLink>
              </li>
              <li className="fs-5 py-2 ps-3 hoverText"> 
            <NavLink className='text-decoration-none'
            to='/contact'
            style={({isActive}) => ({color:isActive ? "#2a2e94" : "white", fontWeight: isActive ? "bolder" : "normal"})}>
              Contact Us
            </NavLink>
              </li>
              <li className="fs-5 py-2 ps-3 hoverText"> 
               <NavLink className='text-decoration-none'
            to='/ourimpact'
            style={({isActive}) => ({color:isActive ? "#2a2e94" : "white", fontWeight: isActive ? "bolder" : "normal"})}>
              Our Impact
            </NavLink>
              
              </li>
              <li className="fs-5 py-2 ps-3 hoverText"> 
            {location.pathname === "/admin-dashboard" && (
               <NavLink className='text-decoration-none'
            to='/admin-dashboard'
            style={({isActive}) => ({color:isActive ? "#2a2e94" : "white", fontWeight: isActive ? "bolder" : "normal"})}>
              Admin
            </NavLink>
              )}
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;