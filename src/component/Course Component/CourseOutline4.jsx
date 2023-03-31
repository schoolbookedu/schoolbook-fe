import React from 'react'
import './CourseOutline.css'
import MediaContent from '../Media Content/MediaContent'

const CourseOutline4 = () => {
  return (
    <div className='courseoutline'>
    <div className='sidenavContent-title'>
        <div className='sidenavContent-text'>
          <div className='sidenavContent-titletext'>
            <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
          </div>
          <div className='sidenavContent-subtitletext'>  
            <h2>FUNDAMENTALS OF GRAPHIC DESIGN <span>Course Outline 4</span></h2>
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

export default CourseOutline4