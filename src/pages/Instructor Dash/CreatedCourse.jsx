import {React, useState} from 'react'
import '../DashboardPage/Dashboard.css'
import './InstructorDashboard.css'
import Nav from '../../component/Navbar/Nav'
import Create from '../../component/Create Courses/Create';
import Created from '../../component/Featured Courses/Created';
import OutlineCourse from '../../component/Course Component/OutlineCourse';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const tab = [
  { id: 1, label: "Home" },
  { id: 2, label: "Create Course" },
  { id: 0, label: "Course Created" }
];

const CreatedCourse = () => {
  const [activeTab, setActiveTab] = useState(0);
//   const [cards, setCards] = useState([]);
  const inputTitle = useSelector((state) => state.inputTitle);

  return (
    <div>
      <Nav />
      <div className="dashboard">
        <div className='dashboard-container'>
        <div className="dashboard-tab">
          {tab.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        </div>
        <div className="dashboard-content">
          {activeTab === 1 && 
            <div className='outline'>
               <OutlineCourse />
            </div>}
          {activeTab === 2 && 
          <div className='content-container'>
            <div className='create-container'>
              <Create />
            </div>
          </div>}
          {activeTab === 0 && 
            <div className='fcourse-container'> 
              <div className='instcourse-container'>
              <div className='fcourse-scroll'>
                <Link to="/InstructorEdit" style={{textDecoration:"none", color:"#000"}}>
                <Created/>
              {/* {cards.map((card, index) => (
                <Created key={index} title={inputTitle} />
                ))} */}
                </Link> 
            </div> 
            <div className='fcourse-scroll'>
              <Created/>
              <Created/>
              <Created/>
            </div> 
              </div>
            </div>}
        </div>
      </div>    
    </div>
  )
}

export default CreatedCourse