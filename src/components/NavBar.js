import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import NavBarLogoImg from './navBarImage/NavLogoImg.png';
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top w-100">
      <div className="container-fluid d-flex align-item-center justify-content-between px-5">
        <div className="navbar-brandDiv">
          <NavLink className="navbar-brand" to="/">
            <img src={NavBarLogoImg} alt="Senidea Logo" className="w-100 h-100" />
          </NavLink>
        </div>

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

        <div>
          <div className="collapse collapse-horizontal navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav-underline">
              <li className="nav-item me-3 list-style-none">
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
              <li className="nav-item me-3 list-style-none">
                <NavLink
                  className="text-decoration-none fs-5 nav-link"
                  to="/about"
                  style={({ isActive }) => ({
                    color: isActive ? "#2A2E94" : "black",
                    fontWeight: isActive ? "bolder" : "normal",
                  })}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item me-3 list-style-none">
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
              <li className="nav-item me-3 list-style-none">
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

              <li className="nav-item me-3 list-style-none">
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
        <NavLink to="/donation" className="py-2 px-4 text-white rounded text-decoration-none fw-bold generalBtn">
          Donation
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;