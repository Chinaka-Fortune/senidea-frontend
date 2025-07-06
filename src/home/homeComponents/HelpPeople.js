import React from "react";
import { NavLink } from "react-router-dom";
import LadyBackingBaby from "../homeImages/ladyBackingBaby.jpg";
import manSitting from "../homeImages/manSitting.jpg";
import starringLady from "../homeImages/starringLady.jpg";

const HelpPeople = () => {
  return (
    <div className="container-fluid py-5" style={{backgroundColor:'#FAF8F8'}}>
      <div className="row px-md-2 px-xl-5 py-5  SenideaEnableAllDiv">
        <div className="col-md-6 col-lg-5 dCaptionText">
          <div className="">
            <h5 className="generalTextColor">HELP THE PEOPLE</h5>
            <h3 className="">
              Together, we can bring hope where it's needed most.
            </h3>
            <h5 className="mt-3">
              Join our pool of volunteers who assist in pushing the community
              forward
            </h5>
            <NavLink to="/volunteer">
              <button type="button" className="generalBtn px-3 text-white rounded border-0 py-1 mt-4">
                Join us now
              </button>
            </NavLink>
          </div>
        </div>
        <div className="col-md-5 col-lg-7 ourImpactAnimate">
          <div className="w-100 d-flex align-item-center justify-content-center position-relative mt-5 ps-5 mb-5 mb-md-0">
            <div className="helpPeopleImageDiv1">
              <img src={starringLady} alt="A lady starring" />
            </div>
            <div className="helpPeopleImageDiv2">
              <img
                src={LadyBackingBaby}
                alt="A lady carrying a baby at her back"
                className=""
              />
            </div>
            <div className="helpPeopleImageDiv3">
              <img
                src={manSitting}
                alt="A man sitting, starring into the air"
              />
            </div>
            <div className="helpPeopleImageDiv4">
              <img
                src={manSitting}
                alt="A man sitting, starring into the air"
              />
            </div>
            <div className="helpPeopleImageDiv5 bg-primary rounded-circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPeople;