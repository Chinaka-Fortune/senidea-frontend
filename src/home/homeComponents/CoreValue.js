import React from "react";

import Lady from "../homeImages/Lady.jpg";
import "../Home.css";
import "../../index.css";

const CoreValue = () => {
  return (
    <div className=" mt-3 container-fluid ourCoreValueAnimate">
      <div className="row d-flex column-gap-lg-5 px-2  px-lg-5">
        <div className=" col-lg-6 px-2 px-lg-0">
            <ul className="">
          <p className="text-primary fw-bold ">ABOUT SENIDEA</p>
          <h4 className="fw-bolder mb-5">Our Core Values</h4>
          <li>
            <span className="fw-bolder text-dark">Compassion -</span> We
            lead with empathy and kindness, placing human dignity at the center
            of everything we do.
          </li>
          <li className="mt-3">
            <span className="fw-bolder text-dark">Inclusivity -</span> We
            believe everyone deserves equal access to care, opportunities, and
            support — regardless of their background.
          </li>
          <li className="mt-3">
            <span className="fw-bolder text-dark">Integrity -</span> We are
            transparent, accountable, and committed to doing what’s right —
            always.
          </li>
          <li className="mt-3 mbn">
            <span className="fw-bolder text-dark ">Empowerment -</span> We
            don't just give — we equip people with tools, knowledge, and
            confidence to thrive on their own.
          </li>
          <li className="mt-3">
            <span className="fw-bolder text-dark">
              Community-Driven -
            </span>
            We work hand-in-hand with local communities to ensure every action
            we take is meaningful and sustainable.
          </li>
          <li className="mt-2">
            <span className="fw-bolder text-dark">Hope -</span> We are
            driven by the belief that positive change is always possible, and we
            work every day to be a part of that hope.
          </li>
        </ul>

        </div>
        <div className="col-md-5 coreValueLadyImg mt-5 d-none d-lg-block">
          <img src={Lady} alt="A dark skin lady in a black top" />
        </div>
      </div>
    </div>
  );
};

export default CoreValue;
