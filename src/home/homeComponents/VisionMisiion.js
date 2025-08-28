import React from "react";
import "../../index.css";
import oldWomen from "../homeImages/oldWomen.jpg";
const VisionMisiion = () => {
  return (
    <div className="px-2 px-md-3 px-lg-5 mt-5 container-fluid ourCoreValueAnimate">
      <div className="d-flex justify-content-between mx-auto row SenideaEnableAllDiv">
        <div className="col-lg-6">
          <p className="text-primary fw-bold ">
            SENIDEA EnableAll Care Foundation
          </p>
          <p>
            Supporting and fostering dissadvantaged children, young people with
            dissabilities, snd their families to live fulfilling lives.
          </p>

          <h5 className="fw-bolder mb-2">Our Vision</h5>

          <p className="border-start border-2 border-dark ps-5 ms-3">
            <em>
              Empowering lives and fostering inclusivity through education, care
              and support — Enabling limitless possibilities for all.
            </em>
          </p>

          <div>
            <h5 className="fw-bolder mb-2 mt-3">Our Mission</h5>

            <p className="border-start border-2 border-dark ps-5 ms-3">
              <em>
                Promoting equal opportunities and fostering a society where
                everyone can reach their full potential through inclusive
                education, assistive technology, and community integration.
              </em>
            </p>

            {/* <div>
              <p>Empowerment Focused</p>

              <p className="border-start border-2 border-dark ps-5 ms-3">
                <em>
                  To empower underserved individuals and communities by
                  providing access to education, care, and sustainable support
                  systems that promote dignity, self-reliance, and long-term
                  well-being.
                </em>
              </p>

              <p>Compassionate Action Focused</p>

              <p className="border-start border-2 border-dark ps-5 ms-3">
                <em>
                  To serve with compassion by delivering impactful programs that
                  address urgent needs, uplift vulnerable lives, and inspire
                  lasting change through community-driven action
                </em>
              </p>
            </div> */}
          </div>
        </div>

        {/* <div className="coreValueLadyImg mt-3 col-lg-6 d-none d-lg-block">
          <img src={oldWomen} alt="A dark skin lady in a black top" />
        </div> */}

        <div className="col-md-6 d-flex justify-content-end">
                 <div className="SenideaEnableAllDivImg d-none d-lg-block "> 
                   <img src={oldWomen} alt="A dark skin lady in a black top" /></div>
                </div>
      </div>
    </div>
  );
};

export default VisionMisiion;
