import React from 'react'
import './CourseOutline.css'
import MediaContent from '../Media Content/MediaContent'
import { useSelector } from 'react-redux'

const CourseOutline6 = () => {
  const inputTitle = useSelector((state) => state.inputTitle);
  const inputMaterial = useSelector((state) => state.inputMaterial);
  return (
    <div className='courseoutline'>
    <div className='sidenavContent-title'>
        <div className='sidenavContent-text'>
          <div className='sidenavContent-titletext'>
            <h2>{inputTitle}</h2>
          </div>
          <div className='sidenavContent-subtitletext'>  
            <h2>{inputMaterial}<span> Course Outline 6</span></h2>
          </div>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
        <div className='sidenavContentbtn'>
          <button>Followed</button>
        </div>
      </div>
      <MediaContent/>
      </div>
  )
}

export default CourseOutline6