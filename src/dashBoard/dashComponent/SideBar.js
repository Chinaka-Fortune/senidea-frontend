import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLogo from "../../components/navBarImage/NavLogoImg.png";
import { AuthContext } from "../../App";
import "../DashBoard.css";

const SideBar = ({
  handleTriggerBlogs,
  handleTriggerVolunteer,
  handleTriggerPartner,
  handleTriggerDonation,
  handleTriggerOurImpact,
  handleTriggerNewsletter,
  handleTriggerContactUs,
}) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <aside className="bg-dark h-100">
      <nav className="navbar navbar-expand bg-dark border-primary border-end border-3">
        <div className="container-fluid d-flex justify-content-center">
          <img src={NavBarLogo} width={75} alt="Logo" className="navbar-brand" />
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
        </div>
      </nav>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav flex-column mt-2">
          <li className="nav-item">
            <button
              className="btn text-white fw-bolder fs-5 w-100 text-start border-bottom border-top border-2"
              onClick={handleTriggerBlogs}
            >
              Blog
            </button>
          </li>
          <li className="nav-item dropdown">
            <button
              className="btn text-white fw-bolder fs-5 w-100 text-start border-bottom border-top border-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Contents
            </button>
            <ul className="dropdown-menu w-100">
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerVolunteer}>
                  Volunteer
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerPartner}>
                  Partner
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerDonation}>
                  Donation
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerNewsletter}>
                  Newsletter
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerOurImpact}>
                  Our Impact
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerContactUs}>
                  Contact Us
                </button>
              </li>
            </ul>
          </li>
          <li className="nav-item mt-auto">
            <button
              className="btn text-white fw-bolder fs-5 w-100 text-start d-flex align-items-center column-gap-2"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right fs-4"></i>
              Log Out
            </button>
          </li>
        </ul>
      </div>
      <div className="d-none d-md-block">
        <ul className="navbar-nav flex-column mt-2">
          <li className="nav-item">
            <button
              className="btn text-white fw-bolder fs-5 w-100 text-start border-bottom border-top border-2"
              onClick={handleTriggerBlogs}
            >
              Blog
            </button>
          </li>
          <li className="nav-item dropdown">
            <button
              className="btn text-white fw-bolder fs-5 w-100 text-start border-bottom border-top border-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Contents
            </button>
            <ul className="dropdown-menu w-100">
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerVolunteer}>
                  Volunteer
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerPartner}>
                  Partner
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerDonation}>
                  Donation
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerNewsletter}>
                  Newsletter
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerOurImpact}>
                  Our Impact
                </button>
              </li>
              <li>
                <button className="dropdown-item btn w-100" onClick={handleTriggerContactUs}>
                  Contact Us
                </button>
              </li>
            </ul>
          </li>
          <li className="nav-item mt-auto">
            <button
              className="btn text-white fw-bolder fs-5 w-100 text-start d-flex align-items-center column-gap-2"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right fs-4"></i>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;