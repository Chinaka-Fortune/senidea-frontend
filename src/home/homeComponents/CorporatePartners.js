import React from 'react'
import '../../index.css';

import diffrentBrands from '../homeImages/diffrentBrands.png'

const CorporatePartners = () => {
  return (
    <div className='container-fluid px-md-5 mt-5'>
      <div className='row'>
        <div className='col-12'>
            <h5 className='generalTextColor'>OUR PARTNERS</h5>
            <h3 className='fw-bold'>Meet our Corporate Partners</h3>

            <figure className='h-25 w-100 ourCoreValueAnimate'>
                <img src={diffrentBrands} className='img-fluid' alt='diffrent Brands'/>
            </figure>
        </div>
      </div>
    </div>
  )
}

export default CorporatePartners
