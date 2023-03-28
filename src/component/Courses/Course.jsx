import React from 'react'
import img from '../../utils/img.png'
import './Course.css'

const Course = () => {
  return (
    <div className='course'>
        <div className='course-img'>
          <img src={img} alt='course'/>
        </div>
        <div className='course-title'>
          <div className='text'>
            <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
            <span>Tutor: Prof John Tobiloba</span>
          </div>
        </div>
    </div>
  )
}

export default Course