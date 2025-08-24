import React from "react";

// IMPACT IMAGES
import OurImpactComponet from "./OurImpactComponet";
import LoveHands from "../homeImages/LoveHands.jpg";
import OneHand from "../homeImages/OneHand.jpg";
import SmillingBoy from "../homeImages/SmillingBoy.jpg";
import VolunteerImg from "../homeImages/VolunteerImg.jpg";
import ManInBlackImg from "../homeImages/ManInBlackImg.jpg";
import Eating from "../homeImages/Eating.jpg";

import "../Home.css";
import "../../index.css"
const OurImpact = () => {
  return (
    <div className="d-flex flex-column justify-content-center  ourImpactAnimate">
      <div className="text-center my-5">
        {/* <h3 className="fw-bolder">Our Impact</h3> */}
      </div>

      <div className="container">
        <h4 className="fw-bolder mb-4">Our Events</h4>

        <div className="w-50 mt-1 mb-4">
          <h5 className="fw-bolder mt-2 mb-2">Equal Opportunities</h5>
          <p>We promote equal opportunities, and foster a society where everyone can reach their full potential regardless of their physical and cognitive abilities.</p>
        </div>

        <div className="w-50 mt-2">
          <h5 className="fw-bolder mt-2">Provide Support</h5>
          <p>We provide support for persons with dissabilities and the less privileged through partnership with relevant government agencies and donor agencies.</p>
        </div>

      </div>

      <div className="impactComponentDiv d-flex mx-auto justify-content-center">
      <div className="d-flex column-gap-3  overflow-x-auto ">
        <OurImpactComponet
          image={LoveHands}
          dAmout="5000+"
          dText="lives impacted"
        />

        <OurImpactComponet
          image={SmillingBoy}
          dAmout="300+"
          dText="children provided for"
        />

        <OurImpactComponet
          image={Eating}
          dAmout="1,200+"
          dText="meals served"
        />

        <OurImpactComponet
          image={ManInBlackImg}
          dAmout="85%"
          dText="reported improved"
        />

        <OurImpactComponet
          image={VolunteerImg}
          dAmout="150+"
          dText="volunteers"
        />

        <OurImpactComponet
          image={OneHand}
          dAmout="3+"
          dText="active community centers"
        />
      </div>
    </div>
    </div>
  );
};

export default OurImpact;