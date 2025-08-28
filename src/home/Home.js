import React from 'react'

import HomeLandingPage from './homeComponents/HomeLandingPage';
// import OurImpact from './homeComponents/OurImpact';
import CoreValue from './homeComponents/CoreValue';
import VisionMisiion from './homeComponents/VisionMisiion';
import PartOfChange from './homeComponents/PartOfChange';
import OurProgram from './homeComponents/OurProgram';
import MessageSection from './homeComponents/MessageSection';
import MailingList from './homeComponents/MailingList';
import HelpPeople from './homeComponents/HelpPeople';
import CorporatePartners from './homeComponents/CorporatePartners';
import Testimonies from './homeComponents/Testimonies';
import FoundationSenidea from './homeComponents/FoundationSenidea';

const Home = () => {
  return (
    <div>
     <HomeLandingPage />
       <FoundationSenidea /> 
     <CoreValue />
     <VisionMisiion />
     <PartOfChange />
     <OurProgram/>
     <MessageSection />
     <MailingList />
     <HelpPeople />
     <CorporatePartners />
     <Testimonies /> 
    </div>
  )
}

export default Home
