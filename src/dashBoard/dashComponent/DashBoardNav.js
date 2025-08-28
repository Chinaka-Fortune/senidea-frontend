import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import smillingLady from "../../home/homeImages/Lady.jpg";
import { AuthContext } from "../../App";
import "../DashBoard.css";
import '../../index.css';

const DashBoardNav = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-none d-md-block" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="bg-primary text-white fw-bolder rounded border-0 py-2 px-3 text-decoration-none">
                DASHBOARD
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-between column-gap-3">
          <img src={smillingLady} alt="Profile" width={50} className="rounded-circle" />
          <button
            onClick={handleLogout}
            className="btn btn-link text-decoration-none d-flex align-items-center column-gap-2"
          >
            <i className="bi bi-box-arrow-right fw-bolder fs-4 text-primary"></i>
            <span className="fw-bolder text-primary">Log Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNav;