import React from "react";
import "../Home.css";
import "../../index.css";
import sinedeaWhite from "../homeImages/senideaWhite.jpg";
import { NavLink } from "react-router-dom";
const HomeLandingPage = () => {
  return (
    <main>
      <section
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-pause="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active carouselDiv">
            <div className="carousel-caption dCaption">
              <h5 className=" welcomeText">Welcome</h5>
              <h1>SENIDEA Enable All Care Foundation</h1>
              <p>
                Empowering Lives, Embracing Abilities, Enabling Accessibilities
              </p>

              <div className="d-flex justify-content-start column-gap-4">
                <NavLink
                  to="/donation"
                  className="buttonColor px-4 py-2 rounded fw-bold text-white border-0 text-decoration-none"
                >
                  Donate
                </NavLink>
                <NavLink
                  to="/partnership"
                  className=" px-2 py-2 rounded fw-bolder bg-transparent text-white border-3 border-primary text-decoration-none border"
                >
                  Join the movement
                </NavLink>
              </div>
            </div>
          </div>
          <div className="carousel-item carouselDiv">
            <div className="carousel-caption dCaption">
              <h5 className=" welcomeText">Welcome</h5>
              <h1>SENIDEA Enable All Care Foundation</h1>
              <p>
                Empowering Lives, Embracing Abilities, Enabling Accessibilities
              </p>
              <div className="d-flex justify-content-start column-gap-4">
                <NavLink
                  to="/donation"
                  className="buttonColor px-4 py-2 rounded fw-bold text-white border-0 text-decoration-none"
                >
                  Donate
                </NavLink>
                <NavLink
                  to="/partner"
                  className=" px-2 py-2 rounded fw-bolder bg-transparent text-white border-3 border-primary text-decoration-none border"
                >
                  Join the movement
                </NavLink>
              </div>
            </div>
          </div>
          <div class="carousel-item carouselDiv">
            <div className="carousel-caption dCaption">
              <h5 className=" welcomeText">Welcome</h5>
              <h1>SENIDEA Enable All Care Foundation</h1>
              <p>
                Empowering Lives, Embracing Abilities, Enabling Accessibilities
              </p>
              <div className="d-flex justify-content-start column-gap-4">
                <NavLink
                  to="/donation"
                  className="buttonColor px-4 py-2 rounded fw-bold text-white border-0 text-decoration-none"
                >
                  Donate
                </NavLink>
                <NavLink
                  to="/partnership"
                  className=" px-2 py-2 rounded fw-bolder bg-transparent text-white border-3 border-primary text-decoration-none border"
                >
                  Join the movement
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container-fluid mt-5 dCaptionText bg-danger">
        <div className="row mx-auto  mt-4 SenideaEnableAllDiv bg-primary ">
          <div className="col-md-6 mt-4 mb-md-0 ">
            <h5>
              SENIDEA EnableAll Care Foundation Supporting and empowering disadvantaged children, young people with disabilities, and their families to live fulfilling lives.
            </h5>
          </div>
          <div className="col-md-6 SenideaEnableAllDivImg">
            <img src={sinedeaWhite} alt="Happy Children" />
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default HomeLandingPage;
