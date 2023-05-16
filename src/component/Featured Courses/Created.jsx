import React from 'react'
import { useSelector } from 'react-redux'
import img from '../../utils/img.png'


const Created = () => {
  const inputTitle = useSelector((state) => state.inputTitle);
  return (
    <div className='fcourse'>
      <div className='fcourse-img'>
        <img src={img} alt="course" />
      </div>
      <div className='fcourse-text'>
        <h2>{inputTitle}</h2>
        <div className='fcourse-span'>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
      </div>
    </div>
  )
}

export default Created