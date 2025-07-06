import React from "react";
import volunteer from '../aboutImages/volunteer.jpg'
import "../About.css"

const OurMission = () => {
    return (
        <div className="container-fluid py-5 ourCoreValueAnimate" >

            <div className=" row d-md-flex column-gap-4 flex-md-row  align-item-center px-md-5 ">
                <div className="col-lg-5 justify-content align-item-center d-none d-lg-block">
                    <figure className="volunteerPixDiv pt-5">
                        <img src={volunteer} className="volunteerPix" alt="volunteer" />
                    </figure>
                </div>
                <div className="col-lg-5">

                    <h6 className="missionAndVision missionLine  mx-auto w-50 ">MISSION & VISION</h6>


                    <h4 className="">Our Mission are in two parts:</h4>
                    <h6 className="fs-5 pt-3">Empowerment Focused</h6>


                    <p className="ms-3 fst-italic empowermentFLine  ps-4 pt-2">
                        To empower underserved individuals and communities by providing access to education, care, and sustainable support systems that promote dignity, self-reliance, and long-term well-being.
                    </p>

                    <h6 className="fs-5 pt-3">Compassionate Action Focused</h6>

                    <p className="ms-3 fst-italic compassionateLine ps-4">
                        To serve with compassion by delivering impactful programs that address urgent needs, uplift vulnerable lives, and inspire lasting change through community-driven action.
                    </p>

                    <h5 className="ourVision">Our Vision</h5>
                    <p className="ourVisionToCreate">
                        To create a world where every individual — regardless of circumstance — is empowered, supported, and given the opportunity to live a life of dignity, purpose, and hope.
                    </p>
                </div>


            </div>
        </div>
    )
}

export default OurMission; 