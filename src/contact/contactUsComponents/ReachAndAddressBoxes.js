import React from 'react'

const ReachAndAddressBoxes = () => {
  return (
    <div className='container-fluid mt-5 ourImpactAnimate'>
      <div className='row column-gap-3 column-gap-md-5 d-flex justify-content-center'>
        <div className='col-5 col-md-4 col-lg-3 bg-info rounded text-white px-3 py-2 py-md-5'>
            <h3>Reach Out</h3>
            <p>We’re available, don’t hesistate to contact us and follow us on social media</p>
        </div>
        <div className='col-5 col-md-4 col-lg-3 bg-info rounded text-white px-3 py-2 py-md-5' style={{backgroundColor:'#F6500F'}}>
             <h3>Address</h3>
            <p>Plot 12, Unity Close, Off Adewale Street, Ikeja, Lagos, Nigeria</p>
        </div>
      </div>
    </div>
  )
}

export default ReachAndAddressBoxes
