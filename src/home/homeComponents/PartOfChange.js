import React from "react";
import handsHoldingBlueLove from "../homeImages/handsHoldingBlueLove.png";
import handsHoldingMoney from "../homeImages/handsHoldingMoney.jpg";
import partnershipHandShake from "../homeImages/partnershipHandShake.jpg";
import beneficiaryHands from "../homeImages/beneficiaryHands.jpg";
import { Link } from "react-router-dom";
import "../Home.css";

const PartOfChange = () => {
  return (
    <div className="container-fluid mt-5 pt-3">
      <div className="row ps-3 ps-md-5 pb-5">
        <div className="col-lg-6 col-md-9 bePartanimation">
          <div className="">
            <h4 className="fw-bolder mb-4">Be Part of the Change</h4>
          </div>
          <p>
            Across cities and rural communities,
            <span className="fw-bolder">Senidea EnableAll Care Foundation</span>
            is bringing real hope to real people — from providing school
            supplies to children, offering meals to struggling families,
            supporting health outreaches, and helping individuals rebuild their
            lives with dignity.
          </p>

          <p>
            But this impact doesn’t happen alone.
            <span className="fw-bolder">
              It happens because people like you choose to show up.
            </span>
          </p>

          <p>
            There are four powerful ways you can join this mission and make a
            lasting difference:
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mx-auto d-flex flex-wrap gap-2 gap-md-4 gap-lg-5 justify-content-evenly pb-5">
          <div className="col-lg-6 beneficiaryAndSupportDiv">
            <Link to='/volunteer'><img src={handsHoldingBlueLove} alt="handsHoldingBlueLove" /></Link>
            <h5 className="fw-bolder text-center">Volunteer</h5>
            <p>
              your time and skills to support outreach programs and events.
            </p>
          </div>

          <div className="col-lg-6 beneficiaryAndSupportDiv">
            <Link to='/donation'><img src={handsHoldingMoney} alt="handsHoldingMoney" /></Link>
            <h5 className="fw-bolder text-center">Donate</h5>
            <p>
              to help us reach more lives and respond faster to urgent needs.
            </p>
          </div>
          <div className="col-lg-6 beneficiaryAndSupportDiv">
            <Link to='/partner'><img src={partnershipHandShake} alt="partnershipHandShake" /></Link>
            <h5 className="fw-bolder text-center">Partner with us </h5>
            <p>
              as an individual, organization, or business to amplify our
              collective impact.
            </p>
          </div>
          <div className="col-lg-6 beneficiaryAndSupportDiv">
            <Link to='/contact'><img src={beneficiaryHands} alt="beneficiaryHands" /></Link>
            <h5 className="fw-bolder text-center">Become a beneficiary</h5>
            <p>
              {" "}
              Providing assistance when in need, supporting at the rear being
              the strength at core times.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 ps-3 ps-md-5 border-start border-2 border-dark col-lg-6  lh-2 ms-md-5 ms-3">
        <p>
          Every hand extended, every resource shared, every life touched — it
          all counts.
        </p>
        <blockquote className="fw-bolder">
          Together, we can enable all.
        </blockquote>
      </div>
    </div>
  );
};

export default PartOfChange;
