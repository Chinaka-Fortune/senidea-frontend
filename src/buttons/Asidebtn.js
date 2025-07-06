import React from 'react'
import DashBoardBlog from '../dashBoard/dashComponent/DashBoardBlog';

const Asidebtn = ({ trigerBlog }) => {
  return (
    <div className='d-grid'>
      {/* <button className='btn text-start fw-bolder fs-5 text-white border-bottom border-top border-2 btn-block' onClick={blogClick}>Blog</button> */}
      { trigerBlog ? <DashBoardBlog /> : null}
    </div>
  )
}

export default Asidebtn;
