import React from "react";
import "../Home.css";

const OurImpactComponet = (props) => {
  return (
    <div>
      <div className="OurImpactComponetDiv mx-auto">
        <img src={props.image} alt="impact displays" className="img-fluid" />
      </div>
      <div className="text-center OurImpactComponetDiv">
        <h6 className=" fw-bold">{props.dAmout}</h6>
        <p className="">{props.dText}</p>
      </div>
    </div>
  );
};

export default OurImpactComponet;
