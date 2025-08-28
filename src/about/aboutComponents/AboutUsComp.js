import React from 'react';
import '../../index.css';
import hoodieBoy from '../aboutImages/hoodieBoy.jpg'


const AboutUsComp = () => {

    return (
        <div className="container-fluid">
            
            <div className="row d-md-flex flex-column flex-md-row justify-content-center column-gap-5 align-items-center">
 
                <h2 className="aboutUs fs-1 fw-bolder mb-5 py-4 ps-5 w-100 ourLandingAnimate">About Us</h2>
                
                <div className="col-md-5 ourLandingAnimate">
                    <figure className="">
                        <img src={hoodieBoy} className="hoodieBoypix"
                            alt="hoodieBoy" />
                    </figure>
                </div>
                <div className="col-md-5 ourLandingAnimate">
                    <h6 className="aboutSenidea aboutVrLine ps-3">ABOUT SENIDEA</h6>
                    <p className="mt-3">
                        Senidea EnableAll Care Foundation is committed to uplifting underserved individuals and communities by providing access to essential care, support, and empowerment programs. Our goal is to create inclusive opportunities that improve lives, promote well-being, and inspire lasting change through compassion, education, and active community engagement.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default AboutUsComp;