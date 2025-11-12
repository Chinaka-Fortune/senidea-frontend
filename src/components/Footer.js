import React from 'react'
import { NavLink } from 'react-router-dom';
import './Footer.css'
import navLogoImg from './navBarImage/NavLogoImg.png'
const Footer = () => {
  return (
    <footer className='container-fluid px-lg-5 pt-lg-5 mt-5'>
      <div className='row px-lg-3 pt-lg-4 pb-lg-3'>
        <div className='col-lg-3'>
          <h3 className='text-white mb-4'>Your Donation can Change their daily lifestyles</h3>
          <NavLink to='/donation' className='py-2 px-4 text-white rounded text-decoration-none fw-bold generalBtn'>Donation</NavLink>

          <figure className='footerimg rounded mt-5'>
            <img src={navLogoImg} alt="Senidea Logo"></img>
          </figure>
        </div>

        <div className='col-lg-5'>
          
          <div className='d-flex'>
            <div className='col'>
            <ul className='footerUl1'>
              <h5 className='mb-4 text-white fw-bold'>Organization</h5>
              <li className='mb-2'><NavLink to='/about' className="text-decoration-none text-white">About Us</NavLink></li>
              <li className='mb-2'><NavLink to='/contact' className="text-decoration-none text-white">Contact Us</NavLink></li>
              <li className='mb-2'><NavLink to='/inclusive' className="text-decoration-none text-white">Inclusive Education</NavLink ></li>
              <li><NavLink className="text-decoration-none text-white" to='/ourInclusive'>Our Champions</NavLink></li>
            </ul>
          </div>
          <div className='col'>
             <ul className='footerUl1'>
              <h5 className='mb-4 text-white fw-bold'>Links</h5>
              <li className='mb-2'><NavLink to='/media' className="text-decoration-none text-white">Media</NavLink></li>
              <li className='mb-2'><NavLink to='/policies' className="text-decoration-none text-white">Policies</NavLink></li>
              <li className='mb-2'><NavLink to='/f.a.qs' className="text-decoration-none text-white">F.A.Qs</NavLink ></li>
              
            </ul>
          </div>
          </div>
        </div>
        <div className='col-lg-4'>
           <ul className='footerUl1'>
              <h5 className='mb-4 text-white fw-bold'>Contacts</h5>
              <li className='mb-2 d-flex'><i className="bi bi-envelope me-2 text-white fw-bolder"></i><NavLink to='/senideaenableallfoundation@mail.com' className="text-decoration-none text-white">senideaenableallfoundation@mail.com</NavLink></li>

              <li className='mb-2'><i className="bi bi-telephone-fill text-white me-2"></i><NavLink to='/tel:+234 913 145 0872' className="text-decoration-none text-white">+234 913 145 0872</NavLink ></li>

              <li className='mb-2 d-flex'><i className="bi bi-geo-alt-fill me-2 text-white"></i><NavLink to='/Plot 12, Unity Close, Off Adewale Street, Ikeja, Lagos, Nigeria' className="text-decoration-none text-white">No 39 Orlu road Amakohia, Opposite Imo Senior Citizen Center, Owerri, Imo State, Nigeria</NavLink></li>

              <li className='mb-2 d-flex'><i className="bi bi-facebook text-white me-2"></i><NavLink to='/SenideaEnableAll' className="text-decoration-none text-white">SenideaEnableAll</NavLink ></li>

              <li className='mb-2 d-flex'><i className="bi bi-instagram text-white me-2"></i><NavLink to='/senideaenableall' className="text-decoration-none text-white">senideaenableall</NavLink ></li>

              <li className='mb-2 d-flex'><i className="bi bi-twitter-x text-white me-2"></i><NavLink to='/SenideaCare' className="text-decoration-none text-white">SenideaCare</NavLink ></li>

              <li className='mb-2 d-flex'><i className="bi bi-youtube text-white me-2"></i><NavLink to='/SenideaEnableAllFoundation' className="text-decoration-none text-white">Senidea Enable All Foundation</NavLink ></li>

              <li className='mb-2 d-flex'><i className="bi bi-linkedin text-white me-2"></i><NavLink to='/senideaenableall' className="text-decoration-none text-white">senideaenableall</NavLink ></li>
            </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
