import smillingBoy from "../homeImages/SmillingBoy.jpg";
import '../Home.css'
import '../../index.css';
const FoundationSenidea = () => {
  return (
    <div className="container-fluid px-2 px-md-3 px-lg-5 mt-4 pt-4">
      <div className="row SenideaEnableAllDiv d-flex justify-content-between mx-auto">
        <div className="col-md-6 d-flex align-items-center mt-4 mt-sm-0">
          <h3 className="">
            SENIDEA EnableAll Care Foundation Supporting and empowering
            disadvantaged children, young people with disabilities, and their
            families to live fulfilling lives.
          </h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
         <div className="SenideaEnableAllDivImg "> 
            <img
            src={smillingBoy}
            alt="Happy Children"
            
          /></div>
        </div>
      </div>
    </div>
  );
};
export default FoundationSenidea;
