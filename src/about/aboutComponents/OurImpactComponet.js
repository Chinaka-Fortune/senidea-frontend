import React from "react";
import "../../home/Home.css";

const OurImpactComponet = (props) => {
  return (
    <div>
      <div className="OurImpactComponetDiv mx-auto">
        <img src={props.image} alt="" />
      </div>
      <div className="text-center OurImpactComponetDiv">
        <h6 className=" fw-bold">{props.dAmout}</h6>
        <p className="">{props.dText}</p>
      </div>
    </div>
  );
};

export default OurImpactComponet;
