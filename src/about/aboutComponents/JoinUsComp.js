import React from "react";
import manInGreenApron from "../aboutImages/manInGreenApron.jpg";
import moneyOnHand from "../aboutImages/moneyOnHand.jpg";
import handShakeImage from "../aboutImages/handShakeImage.jpg";
import joinedHands from "../aboutImages/joinedHands.jpg";
import { Link } from "react-router-dom";
import "../About.css"
import "../../index.css"

const JoinUs = () => {
  return (
    <div className="conatainer-fluid">
      <div className="row  ">
        <h5 className=" joinUsVrLine ps-2 mx-auto ">Join Us</h5>
        <h3 className="text-center fw-bold p-5 py-2">Be a Part of Change</h3>

        <div className="col-md-9 col-lg-5 d-flex flex-wrap gap-4 gap-md-5 mx-auto justify-content-center justify-content-md-evenl mb-4">
          <div className="greenManCol col-md-6 ourImpactAnimate" >
              <Link to='/volunteer'><img
                src={manInGreenApron}
                className="greenMan img-fluid"
                alt="manInGreenApron"
              /></Link>
              <h3 className="text-md-center">Volunteer</h3>
              <p className="outreachProgram">
                your time and skills to support outreach programs and events.
              </p>
          </div>

          <div className="moneyOnHandImgDiv col-md-6 ourImpactAnimate">
            <Link to="/donation">
            <img
                src={moneyOnHand}
                className="moneyOnHandImg img-fluid"
                alt="moneyOnHand"
              />
            </Link>
             <h5 className="text-md-center fw-bolder">Donate</h5>
              <p className="donateToHelp">
                to help us reach more lives and respond faster to urgent needs.
              </p>
            
          </div>

          <div className="handShakeImgDiv col-md-6 ourImpactAnimate">
      
             <Link to="/partner"> <img
                src={handShakeImage}
                className="handShakeImg img-fluid"
                alt="handShakeImg"
              /></Link>
            
              <h5 className="text-md-center fw-bolder">Partner with us</h5>
              <p className="handshakeP">
                as an individual, organization, or business to amplify our
                collective impact.
              </p>
        
          </div>
          <div className="joinedHandsImgDiv col-md-6 ourImpactAnimate">
           
              <Link to="/contact"><img
                src={joinedHands}
                className="joinedHands img-fluid"
                alt="joinedHands"
              /></Link>
            
              <h5 className="text-md-center fw-bolder">Become a beneficiary</h5>
              <p className="joinedHandAsst">
                Providing assistance when in need, supporting at the rear being
                the strength at core times.
              </p>
        
          </div>
        </div>
      </div>

         </div>
  );
};

export default JoinUs;
