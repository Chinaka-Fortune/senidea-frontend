import React from "react";

const TestimoniesComp = ({
  TestimoniesCompText,
  TestimoniesCompName,
  TestimoniesCompLocation,
}) => {
  return (
    <div className="col-md-5 col-10 col-xl-3">
      <div
        className=" p-4  round commentDiv"
        style={{ backgroundColor: "#F5F4F4" }}
      >
        <div className="mb-4">
          <i
            className="bi bi-quote  p-3 rounded-circle text-white"
            style={{ backgroundColor: "#2A2E94" }}
          ></i>
        </div>

        <p>
          <em>{TestimoniesCompText}</em>
        </p>
      </div>
      <h5 className="">{TestimoniesCompName}</h5>
      <p className="fw-bold">{TestimoniesCompLocation}</p>
    </div>
  );
};

export default TestimoniesComp;
