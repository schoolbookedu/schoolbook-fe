import {React, useState} from 'react'
import './Dashboard.css'
import Course from '../../component/Courses/Course'
import Fcourse from '../../component/Featured Courses/Fcourse'
import Nav from '../../component/Navbar/Nav'
import Search from '../../component/Searchbar/Search'
import Progress from '../../component/Courses/Progress'

const tab = [
  { id: 0, label: "Home" },
  { id: 1, label: "Inprogress" },
];
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Nav/>
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
            <h2>Your Courses</h2>
            <Course/>
          <div className='search-container'>
          <h2>Featured Courses</h2>
          <Search/>
          </div>
          <div className='fcourse-container'> 
          <div className='fcourse-scroll'>
            <Fcourse/>
            <Fcourse/>
            <Fcourse/>
          </div> 
          </div>
          </div>}
          {activeTab === 1 && 
          <div className='content-container'>
            <Progress/>
          </div>}
        </div>
      </div>    
      </>
  )
}

export default Dashboard