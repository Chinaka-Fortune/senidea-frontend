import React from "react";
import oldWomen from "../homeImages/oldWomen.jpg";
const VisionMisiion = () => {
  return (
    <div className="px-2 px-md-3 px-lg-5 mt-5 container-fluid ourCoreValueAnimate">
      <div className="d-flex justify-content-around row ms-2">
        <div className="col-lg-5">
          <p className="text-primary fw-bold ">ABOUT SENIDEA</p>
          <h4 className="fw-bolder mb-5">Our Vision & Mission</h4>

          <p>
            To create a world where every individual — regardless of
            circumstance — is empowered, supported, and given the opportunity to
            live a life of dignity, purpose, and hope.
          </p>
          <div>
            <h5>There are two parts to our mission:</h5>

            <div>
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
                .
              </p>
            </div>
          </div>
        </div>

        <div className="coreValueLadyImg mt-5 col-lg-5 d-none d-lg-block pt-4">
          <img src={oldWomen} alt="A dark skin lady in a black top" />
        </div>
      </div>
    </div>
  );
};

export default VisionMisiion;
