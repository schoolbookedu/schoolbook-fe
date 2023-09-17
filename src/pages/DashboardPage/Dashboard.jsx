import {React, useState} from 'react'
import './Dashboard.css'
import Course from '../../component/Courses/Course'
import Fcourse from '../../component/Featured Courses/Fcourse'
import Nav from '../../component/Navbar/Nav'
import Search from '../../component/Searchbar/Search'
import Progress from '../../component/Courses/Progress'
import { queries } from '../../api'
import { OverlayLoader } from '../../loaders'
import { useQuery } from '@tanstack/react-query'

const tab = [
  { id: 0, label: "Home" },
  { id: 1, label: "Inprogress" },
];
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const {getCourses} = queries;
const {data, isLoading, isError} = useQuery({
    queryKey: ["courses"], queryFn: getCourses 
});
if (
  isLoading
) {
  return <OverlayLoader showing={true} />;
}
console.log(data.data)

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
          {data?.data?.resource?.length>0 ? <>
                  {data.data.resource.map((resource) => <Fcourse key={resource?.id} resource={resource}/>)}
                  </> : <>No courses available</>}
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