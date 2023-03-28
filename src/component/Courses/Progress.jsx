import React from 'react'
import img from '../../utils/img.png'
import './Course.css'

const Progress = () => {
  return (
    <div className='progress-container'>
        <div className='course-img'>
          <img src={img} alt='course'/>
        </div>
        <div className='course-title'>
          <div className='text'>
            <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
            <span>Tutor: Prof John Tobiloba</span>
            <div className='progress'>
                <span>40% completed</span>
                <input type="range" value="40" min="0" max="100" id="range" />
          </div>
          </div>
        </div>
    </div>
  )
}

export default Progress