import React, { useState } from "react";
import DashBoardNav from "./dashComponent/DashBoardNav";
import SideBar from "./dashComponent/SideBar";
import DashBoardHome from "./dashComponent/DashBoardHome";
import "./DashBoard.css";

const DashBoard = () => {
  const [triggerBlogs, setTriggerBlogs] = useState(true);
  const [triggerVolunteer, setTriggerVolunteer] = useState(false);
  const [triggerPartner, setTriggerPartner] = useState(false);
  const [triggerDonation, setTriggerDonation] = useState(false);
  const [triggerOurImpact, setTriggerOurImpact] = useState(false);
  const [triggerNewsletter, setTriggerNewsletter] = useState(false);
  const [triggerContactUs, setTriggerContactUs] = useState(false);

  const handleTriggerBlogs = () => {
    setTriggerBlogs(true);
    setTriggerVolunteer(false);
    setTriggerPartner(false);
    setTriggerDonation(false);
    setTriggerOurImpact(false);
    setTriggerNewsletter(false);
    setTriggerContactUs(false);
  };

  const handleTriggerVolunteer = () => {
    setTriggerBlogs(false);
    setTriggerVolunteer(true);
    setTriggerPartner(false);
    setTriggerDonation(false);
    setTriggerOurImpact(false);
    setTriggerNewsletter(false);
    setTriggerContactUs(false);
  };

  const handleTriggerPartner = () => {
    setTriggerBlogs(false);
    setTriggerVolunteer(false);
    setTriggerPartner(true);
    setTriggerDonation(false);
    setTriggerOurImpact(false);
    setTriggerNewsletter(false);
    setTriggerContactUs(false);
  };

  const handleTriggerDonation = () => {
    setTriggerBlogs(false);
    setTriggerVolunteer(false);
    setTriggerPartner(false);
    setTriggerDonation(true);
    setTriggerOurImpact(false);
    setTriggerNewsletter(false);
    setTriggerContactUs(false);
  };

  const handleTriggerOurImpact = () => {
    setTriggerBlogs(false);
    setTriggerVolunteer(false);
    setTriggerPartner(false);
    setTriggerDonation(false);
    setTriggerOurImpact(true);
    setTriggerNewsletter(false);
    setTriggerContactUs(false);
  };

  const handleTriggerNewsletter = () => {
    setTriggerBlogs(false);
    setTriggerVolunteer(false);
    setTriggerPartner(false);
    setTriggerDonation(false);
    setTriggerOurImpact(false);
    setTriggerNewsletter(true);
    setTriggerContactUs(false);
  };

  const handleTriggerContactUs = () => {
    setTriggerBlogs(false);
    setTriggerVolunteer(false);
    setTriggerPartner(false);
    setTriggerDonation(false);
    setTriggerOurImpact(false);
    setTriggerNewsletter(false);
    setTriggerContactUs(true);
  };

  return (
    <div className="dashboard-main">
      <div className="glass-dashboard container-fluid">
        <div className="row">
          <div className="col-md-3 sidebar">
            <SideBar
              handleTriggerBlogs={handleTriggerBlogs}
              handleTriggerVolunteer={handleTriggerVolunteer}
              handleTriggerPartner={handleTriggerPartner}
              handleTriggerDonation={handleTriggerDonation}
              handleTriggerOurImpact={handleTriggerOurImpact}
              handleTriggerNewsletter={handleTriggerNewsletter}
              handleTriggerContactUs={handleTriggerContactUs}
            />
          </div>
          <div className="col-md-9">
            <DashBoardNav />
            <div className="content">
              <DashBoardHome
                triggerBlogs={triggerBlogs}
                triggerVolunteer={triggerVolunteer}
                triggerPartner={triggerPartner}
                triggerDonation={triggerDonation}
                triggerOurImpact={triggerOurImpact}
                triggerNewsletter={triggerNewsletter}
                triggerContactUs={triggerContactUs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;