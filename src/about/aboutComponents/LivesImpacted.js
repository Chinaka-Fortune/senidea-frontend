import React from "react";
import LoveHands from '../aboutImages/LoveHands.jpg'
import SmilingBoy from '../aboutImages/SmilingBoy.jpg'
import Eating from '../aboutImages/Eating.jpg'
import ManInBlackImg from '../aboutImages/ManInBlackImg.jpg'
import VolunteerImg from '../aboutImages/VolunteerImg.jpg'
import OneHand from '../aboutImages/OneHand.jpg'

import '../About.css';
import '../../index.css';
function LivesImpacted() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row border border-danger">
                    <div className="col">
                        <div className=" border border-dark">
                            <div className="joinedhands">
                                <img src={LoveHands} className="hands" alt="hands" />
                            </div>
                                <p className="joinedHandParagh">5000 +</p>
                                <p className="livesImpatedP">Lives imparted</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border border-dark">
                            <div className="smilingBoyDiv">
                                <img src={SmilingBoy} className="smilingBoy" style={{width: 100 + "%", height: 100 + "%"}} alt="smilingBoy"/>
                            </div>
                            <p className="fw-bold fs-1 text-center">300 +</p>
                            <p className="fs-4 fw-bold text-center">children provided</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border border-dark" style={{width: 8 + "rem"}}>
                            <div className="mealservedDiv">
                                <img src={Eating} className="mealserved w-100" style={{width: 9 + "rem", height: 8 + "rem"}} alt="mealServed"/>
                            </div>
                            <p className="fs-1 fw-bold text-center">1200 +</p>
                            <p className="fs-4 fw-bold text-center"  >Meal served</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border border-dark">
                            <div className="beneficiaryRDiv">
                                <img src={ManInBlackImg} className="beneficiaryR" style={{width: 9 + "rem", height: 8 + "rem"}} alt="beneficiaryR"/>
                            </div>
                            <p className="fs-1 fw-bold text-center">85%</p>
                            <p className="fs-4 fw-bold text-center">beneficiaries reported improved</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border border-dark">
                            <div className="volunteersPixDiv">
                                <img src={VolunteerImg} className="volunteersPix" style={{width: 9 + "rem", height: 8 + "rem"}}alt="volunteersPix"/>
                            </div>
                            <p className="fs-1 fw-bold text-center">150+</p>
                            <p className="fs-4 fw-bold text-center">Volunteers</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border border-dark">
                            <div className="oneHandDive">
                                <img src={ OneHand } className="beneficiaryR" alt="activeCommunity"/>
                            </div>
                            <p className="fs-1 fw-bold text-center">3</p>
                            <p className="fs-4 fw-bold text-center">active community centers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LivesImpacted;