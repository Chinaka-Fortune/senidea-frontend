import React from "react";
import OurProgramComp from "./OurProgramComp";

import HappyGirl from "../homeImages/HappyGirl.jpg";
import childrenInClass from "../homeImages/childrenInClass.jpg";
import bags from "../homeImages/bags.jpg";
import handsInAgreement from "../homeImages/handsInAgreement.jpg";
import familyWithChild from "../homeImages/familyWithAChild.jpg";

import "../Home.css";

const OurProgram = () => {
  return (
    <div className="container-fluid">
      <h4 className="text-center fw-bolder my-5">Our Programs</h4>

      <div className="row">
        <div className="d-flex col-lg-9 flex-wrap mx-auto justify-content-center">
          <div className="col-lg-4 OurProgramDiv ourCoreValueAnimate">
            <OurProgramComp
              programPic={HappyGirl}
              programHeader="Community Wellness Outreach"
              programText="We organize regular wellness campaigns that provide free health checks, nutrition education, and emotional support to underserved communities. Our goal is to help people live healthier, happier lives — regardless of their background."
              alt="An image of a girl extreemly happy"
            />
          </div>

          <div className="col-lg-4 OurProgramDiv ourCoreValueAnimate">
            <OurProgramComp
              programPic={childrenInClass}
              programHeader="Education for All"
              programText="From school supplies to scholarships, we support children and young adults with the resources they need to stay in school and succeed. Every pencil, book, and lesson brings them closer to a brighter future."
              alt="photo of children in classroom"
            />
          </div>

          <div className="col-lg-4 OurProgramDiv ourCoreValueAnimate">
            <OurProgramComp
              programPic={bags}
              programHeader="Food Relief & Nutrition Support"
              programText="Through monthly food drives and targeted nutritional support, we ensure that families in crisis have access to balanced, nourishing meals. No one should have to go to bed hungry."
              alt="lots of bags containing items"
            />
          </div>

          <div className="col-lg-4 OurProgramDiv ourCoreValueAnimate">
            <OurProgramComp
              programPic={handsInAgreement}
              programHeader="Skills & Empowerment Workshops"
              programText="We host free vocational and soft skills workshops for youth and women, equipping them with practical tools to start businesses, find work, and build self-reliant futures."
              alt="image of Skills & Empowerment Workshops"
            />
          </div>
          <div className="col-lg-4 OurProgramDiv ourCoreValueAnimate">
            <OurProgramComp
              programPic={familyWithChild}
              programHeader="Family Support Program"
              programText="Our foundation offers direct support to vulnerable families through short-term aid, emotional counseling, and social care referrals. We stand with families during life’s most difficult moments."
              alt="image of Skills & Empowerment Workshops"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProgram;
