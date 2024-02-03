import {React} from 'react'
import MediaContent from '../Media Content/MediaContent'
import './CourseOutline.css'
import { useSelector } from 'react-redux'
import banner from '../../utils/banner.png'

const CourseOuline2 = () => {
  const inputTitle = useSelector((state) => state.inputTitle);
  const inputMaterial = useSelector((state) => state.inputMaterial);
  return (
    <div className='courseoutline'>
       <div className="mediaaudio">
              <img src={banner} alt="audiobanner" />
            </div>
      <br/>
      <div className='sidenavContent-title'>
          <div className='sidenavContent-text'>
            <div className='sidenavContent-titletext'>
              <h2>Software Engineering</h2>
            </div>
            <div className='sidenavContent-subtitletext'>  
              <h2>Introduction to Software Engineering<span> Course Module 2</span></h2>
            </div>
            <span>Tutor: Prof John Tobiloba</span>
          </div>
          <div className='sidenavContentbtn'>
            <button>Followed</button>
          </div>
        </div>
        
    </div>
  )
}

export default CourseOuline2