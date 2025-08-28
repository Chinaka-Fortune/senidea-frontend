import React from "react";
import '../../index.css'
import theBoyWithBroom from '../aboutImages/theBoyWithBroom.jpg'

function CoreValue() {
    return (
        <div className="container mt-5">
            <div className="row d-md-flex column-gap-2 align-items-center">

                
                    
                <div className="col-lg-6">
                
                        <h6 className="aboutSenidea mb-3 ourCoreValueAnimate">ABOUT SENIDEA</h6>
                        <h4 className="mb-5 ourCoreValueAnimate">Our Core Value</h4>
                        <p className="ourCoreValueAnimate"><b>Compassion -</b> We lead with empathy and kindness, placing human dignity at the center of everything we do.  </p>
                        <p className="ourCoreValueAnimate"><b>Inclusivity - </b> We believe everyone deserves equal access to care, opportunities, and support — regardless of their background.</p>
                        <p className="ourCoreValueAnimate"><b>Integrity -</b>We are transparent, accountable, and committed to doing what’s right — always.</p>
                        <p className="ourCoreValueAnimate"><b>Community-Driven -</b>We work hand-in-hand with local communities to ensure every action we take is meaningful and sustainable.</p>
                        <p className="ourCoreValueAnimate"><b>Hope -</b>We are driven by the belief that positive change is always possible, and we work every day to be a part of that hope</p>

                        <h3 className="ourCulture my-2">Our Culture</h3>
                        <ul className="list">
                            <li className="ourCoreValueAnimate">We act with empathy and care — always seeking to understand before we serve.</li>
                            <li className="ourCoreValueAnimate">Every person matters. We embrace diversity and ensure no one is left behind.</li>
                            <li className="ourCoreValueAnimate">We serve with humility and a deep commitment to putting others first.</li>
                            <li className="ourCoreValueAnimate">We are transparent with our actions and responsible for the trust placed in us.</li>
                            <li className="ourCoreValueAnimate">We uplift people — not just by helping them today, but by equipping them for tomorrow.</li>
                            <li className="ourCoreValueAnimate">We uplift people — not just by helping them today, but by equipping them for tomorrow.</li>
                            <li className="ourCoreValueAnimate">We work hand-in-hand with communities, volunteers, and partners to co-create solutions.</li>
                            <li className="ourCoreValueAnimate">We uphold honesty, fairness, and strong moral principles in every aspect of our work.</li>
                        </ul>
                    </div>
            

                    <div className=" col-lg-5 d-none d-lg-block">
                        <figure className="theBoyWithBroomDiv">
                        <img src={theBoyWithBroom} className="theBoyWithBroomImg" alt="theBoyWithBroom" />
                        </figure>
                    </div>
                </div>
            </div>
        


    )
}

export default CoreValue;