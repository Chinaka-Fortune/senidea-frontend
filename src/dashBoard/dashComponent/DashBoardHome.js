import React from "react";
import DashBoardBlog from "./DashBoardBlog";
import DashBoardVolunteer from "./DashBoardVolunteer";
import DashBoardPartner from "./DashBoardPartner";
import DashBoardDonation from "./DashBoardDonation";
import DashBoardOurImpact from "./DashBoardOurImpact";
import DashBoardNewsLetter from "./DashBoardNewsLetter";
import DashBoardContactUs from "./DashBoardContactUs";

const DashBoardHome = ({
  triggerBlogs,
  triggerVolunteer,
  triggerPartner,
  triggerDonation,
  triggerOurImpact,
  triggerNewsletter,
  triggerContactUs,
}) => {
  if (triggerBlogs) return <DashBoardBlog />;
  if (triggerVolunteer) return <DashBoardVolunteer />;
  if (triggerPartner) return <DashBoardPartner />;
  if (triggerDonation) return <DashBoardDonation />;
  if (triggerOurImpact) return <DashBoardOurImpact />;
  if (triggerNewsletter) return <DashBoardNewsLetter />;
  if (triggerContactUs) return <DashBoardContactUs />;
  return <DashBoardBlog />;
};

export default DashBoardHome;