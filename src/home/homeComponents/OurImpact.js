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
      {/* <div className="text-center my-5"> */}
        {/* <h3 className="fw-bolder">Our Impact</h3> */}
      {/* </div> */}

      <div className="impactComponentDiv d-flex mx-auto justify-content-center flex-column">
        <h2 className="fw-bolder mb-1 ps-lg-3">Our Events</h2>

        <div className=" mt-1 mb-4 impactComponentEventDiv">
          <h5 className="fw-bolder mt-2 mb-2 ps-lg-3 bePartanimation">Equal Opportunities</h5>
          <p className="ps-lg-3 bePartanimation">We promote equal opportunities, and foster a society where everyone can reach their full potential regardless of their physical and cognitive abilities.</p>
        </div>

        <div className=" mt-2 impactComponentEventDiv">
          <h5 className="fw-bolder mt-2 ps-lg-3 bePartanimation">Provide Support</h5>
          <p className="ps-lg-3 bePartanimation">We provide support for persons with dissabilities and the less privileged through partnership with relevant government agencies and donor agencies.</p>
        </div>

      </div>

      <div className="impactComponentDiv d-flex mx-auto justify-content-center mt-4 bePartanimation">
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