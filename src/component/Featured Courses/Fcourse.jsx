import React from 'react'
import img from '../../utils/img.png'
import { Link } from 'react-router-dom';
import './Fcourse.css'

const Fcourse = () => {
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2>INTRODUCTION TO ARTIFICIAL INTELLIGENCE</h2>
        <div className='fcourse-span'>
          <span>Tutor: Prof John Tobiloba</span>
          <span className='amount'>$15</span>
        </div>
        <div className='fcourse-button'>
          <Link to="/CourseMaterials">
            <button>Enroll</button>
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default Fcourse