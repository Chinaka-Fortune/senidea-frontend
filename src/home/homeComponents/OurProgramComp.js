import React from "react";
import "../Home.css";
const OurProgramComp = (props) => {
  return (
    <div className="row">
      <div className="saturateImage">
        <img src={props.programPic} alt={props.alt} />
      </div>
      <div>
        <h5 className="my-3 fw-bold">{props.programHeader}</h5>
        <p>{props.programText}</p>
        {/* <button className="btn-normal text-white rounded px-2 py-1 border-0 generalBtn">
          Learn more
        </button> */}
      </div>
    </div>
  );
};

export default OurProgramComp;
