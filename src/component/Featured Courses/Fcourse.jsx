import React from 'react'
import img from '../../utils/img.png'
import './Fcourse.css'
import { useNavigate } from 'react-router-dom';

const Fcourse = ({resource}) => {

  const navigate = useNavigate()
  
  const enrollCourse = (id) => {
    navigate (`/course-materials/${id}`)
  }
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2 className='uppercase'>{resource?.title}</h2>
        <div className='fcourse-span'>
          <span>Tutor: Prof John Tobiloba</span>
          <span className='amount'>${resource?.price}</span>
        </div>
        <div className='fcourse-button'>
            <button onClick={() => enrollCourse(resource._id)}>Enroll</button>
        </div>
      </div>
    </div>
  )
}

export default Fcourse