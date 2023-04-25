import {React, useState} from 'react'
import '../DashboardPage/Dashboard.css'
import './InstructorDashboard.css'
import Nav from '../../component/Navbar/Nav'
import Create from '../../component/Create Courses/Create';
import Created from '../../component/Featured Courses/Created';



const tab = [
  { id: 0, label: "Home" },
  { id: 1, label: "Create Course" },
  { id: 2, label: "Course Created" }
];
const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
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
          {activeTab === 0 && 
          <div className='content-container'>
            <h2>CREATE COURSES</h2>
            <div className='create-course'>
              <Create/>
            </div>
          <div className='search-container'>
          <h2>COURSE CREATED</h2>
          </div>
          <div className='fcourse-container'> 
          <div className='fcourse-scroll'>
            <Created/>
            <Created/>
            <Created/>
          </div> 
          </div>
          </div>}
          {activeTab === 1 && 
          <div className='content-container'>
            <div className='create-container'>
              <Create />
            </div>
          </div>}
          {activeTab === 2 && 
            <div className='fcourse-container'> 
              <div className='instcourse-container'>
              <div className='fcourse-scroll'>
              <Created/>
              <Created/>
              <Created/>
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

export default InstructorDashboard