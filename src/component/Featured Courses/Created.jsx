import React from 'react'
import img from '../../utils/img.png'


const Created = ({resource}) => {

  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={resource?.thumbmail} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2>{resource?.title}</h2>
        <div className='fcourse-span'>
          <span>Tutor: {resource?.tutor?.fullName}</span>
        </div>
      </div>
    </div>
  )
}

export default Created
