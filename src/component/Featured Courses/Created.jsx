import React from 'react'
import img from '../../utils/img.png'

const Created = () => {
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2>INTRODUCTION TO ARTIFICIAL INTELLIGENCE</h2>
        <div className='fcourse-span'>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
      </div>
    </div>
  )
}

export default Created