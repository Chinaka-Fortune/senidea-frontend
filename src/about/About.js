import React from 'react';
import '../about/About.css';
import AboutUsComp from './aboutComponents/AboutUsComp'
import CoreValue from './aboutComponents/CoreValueComp';
import OurMission from './aboutComponents/OurMissionComp';
import OurImpact from './aboutComponents/OurImpact' 
import JoinUs from './aboutComponents/JoinUsComp';

const AboutUs = () => {


 
    return (
        <div>
            <AboutUsComp />
            <CoreValue />
            <OurMission />
            <OurImpact />
            <JoinUs />
        </div>
    )
}

export default AboutUs;