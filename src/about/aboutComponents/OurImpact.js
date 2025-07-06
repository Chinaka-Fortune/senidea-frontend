import React from "react";

// IMPACT IMAGES
import OurImpactComponet from "./OurImpactComponet";
import LoveHands from "../../home/homeImages/LoveHands.jpg";
import OneHand from "../../home/homeImages/OneHand.jpg";
import SmillingBoy from "../../home/homeImages/SmillingBoy.jpg";
import VolunteerImg from "../../home/homeImages/VolunteerImg.jpg";
import ManInBlackImg from "../../home/homeImages/ManInBlackImg.jpg";
import Eating from "../../home/homeImages/Eating.jpg";

import "../../home/Home.css";

const OurImpact = () => {
  return (
    <div className="d-flex flex-column justify-content-center ourCoreValueAnimate">
      <div className="text-center my-5">
        <h3 className="fw-bolder">Our Impact</h3>
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
