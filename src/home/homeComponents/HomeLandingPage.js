import React from "react";
import "../Home.css";
import HappyChildren from "../homeImages/HappyChildren.jpg";
import { NavLink } from "react-router-dom";
const HomeLandingPage = () => {
  return (
    <main>
      <section id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
  <div class="carousel-inner">
    <div class="carousel-item active carouselDiv">
      <img src={HappyChildren} class="d-block w-100" alt="..."/>
      <div className="carousel-caption dCaption">
        <h1>Every Child Deserve a Chance to Thrive</h1>
        <p>Empowering children with disabilities and the underprivileged through education, care, and community support.</p>
       

            <div className="d-flex justify-content-start column-gap-4">
              <NavLink to="/donation" className="buttonColor px-4 py-2 rounded fw-bold text-white border-0 text-decoration-none">Donate</NavLink>
              <NavLink to="/partnership" className=" px-2 py-2 rounded fw-bolder bg-transparent text-white border-3 border-primary text-decoration-none border">Join the movement</NavLink>
            </div>

      </div>
    </div>
    <div class="carousel-item carouselDiv">
    <img src={HappyChildren} class="d-block w-100" alt="..."/>
      <div className="carousel-caption dCaption">
        <h1>Every Child Deserve a Chance to Thrive</h1>
        <p>Empowering children with disabilities and the underprivileged through education, care, and community support.</p>
        <div className="d-flex justify-content-start column-gap-4">
              <NavLink to="/donation" className="buttonColor px-4 py-2 rounded fw-bold text-white border-0 text-decoration-none">Donate</NavLink>
              <NavLink to="/partner" className=" px-2 py-2 rounded fw-bolder bg-transparent text-white border-3 border-primary text-decoration-none border">Join the movement</NavLink>
            </div>
      </div>
    </div>
    <div class="carousel-item carouselDiv">
      <img src={HappyChildren} class="d-block w-100" alt="..."/>
      <div className="carousel-caption dCaption">
        <h1>Every Child Deserve a Chance to Thrive</h1>
        <p>Empowering children with disabilities and the underprivileged through education, care, and community support.</p>
        <div className="d-flex justify-content-start column-gap-4">
              <NavLink to="/donation" className="buttonColor px-4 py-2 rounded fw-bold text-white border-0 text-decoration-none">Donate</NavLink>
              <NavLink to="/partnership" className=" px-2 py-2 rounded fw-bolder bg-transparent text-white border-3 border-primary text-decoration-none border">Join the movement</NavLink>
            </div>
      </div>
    </div>
  </div>
</section>

<section className="container-fluid mt-5 dCaptionText">
<div className="row mx-auto column-5 mt-4 SenideaEnableAllDiv">
  <div className="col-md-6 col-lg-4 mt-4 mb-md-0">
    <h5>
      Senidea EnableAll Care Foundation is committed to uplifting
              underserved individuals and communities by providing access to
              essential care, support, and empowerment programs. Our goal is to
              create inclusive opportunities that improve lives, promote
              well-being, and inspire lasting change through compassion,
              education, and active community engagement.
    </h5>
  </div>
  <div className="col-md-6 SenideaEnableAllDivImg">
    <img src={HappyChildren} alt="Happy Children" />
  </div>
</div>
</section>
    </main>
  );
};

export default HomeLandingPage;
