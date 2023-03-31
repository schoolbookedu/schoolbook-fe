import {React, useState} from 'react'
import CourseOutline6 from '../../component/Course Component/CourseOutline6'
import CourseOutline5 from '../../component/Course Component/CourseOutline5'
import CourseOutline4 from '../../component/Course Component/CourseOutline4'
import CourseOutline3 from '../../component/Course Component/CourseOutline3'
import CourseOutline2 from '../../component/Course Component/CourseOutline2'
import CourseOutline1 from '../../component/Course Component/CourseOutline1'
import Nav from '../../component/Navbar/Nav'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CourseContent.css'


const sideMenu = [
  { id: 0, link: "Course Outline 1" },
  { id: 1, link: "Course Outline 2" },
  { id: 2, link: "Course Outline 3" },
  { id: 3, link: "Course Outline 4" },
  { id: 4, link: "Course Outline 5" },
  { id: 5, link: "Course Outline 6" },
];


const CourseContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Nav/>
      <div className="sidenav">
      <div className="sidenav-container">  
      <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={handleClick}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {isOpen && (
        <div className="side-nav-bar" onClick={() => setIsOpen(false)}>
          <div className="sidenav-body">

          <div className="cancel-icon" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="sidenav-title">
            <h2>Introduction to Graphic Design</h2>
          </div>
          <div className="Sidenav-tab">
          <div className="Menutabs">
          {sideMenu.map((menu) => (
            <ul
              key={menu.id}
              className={activeTab === menu.id ? "active" : ""}
              onClick={() => setActiveTab(menu.id)}
            >
              <li>{menu.link}</li>
            </ul>
          ))}
        </div>
      </div>
        </div>
        </div>
      )}
      </div>
      </div>
      <div className='sidenav-content'>
        <div className="tab-content">
          {activeTab === 0 && <CourseOutline1/>}
          {activeTab === 1 && <CourseOutline2/>}
          {activeTab === 2 && <CourseOutline3/>}
          {activeTab === 3 && <CourseOutline4/>}
          {activeTab === 4 && <CourseOutline5/>}
          {activeTab === 5 && <CourseOutline6/>}
        </div>
      </div>
    </div>
  )
}

export default CourseContent