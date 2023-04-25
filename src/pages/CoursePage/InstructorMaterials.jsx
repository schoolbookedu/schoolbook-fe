import { React, useState } from "react";
import "./CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import banner from "../../utils/banner.png";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import InstructorPrice from "../../component/Price Card/InstructorPrice";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const tab = [{ id: 0, label: "Course Materials" }];

const InstructorMaterials = () => {
  const [activeTab, setActiveTab] = useState(0);  
  const inputTitle = useSelector((state) => state.inputTitle);
  return (
    <>
      <Nav />
      <div className="dashboard">
        <div className="dashboard-container">
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
        <div className="price-content">
          {activeTab === 0 && (
            <div className="course-container">
              <div className="banner">
                <img src={banner} alt="banner" />
              </div>
              <div className="price">
                <div className="price-container">
                  <InstructorPrice  />
                </div>
              </div>
              <div className="price-body">
                <div className="price-title">
                  <h2>{inputTitle}</h2>
                </div>
                <div className="objectivetab-container">
                  <CourseObjective />
                  <div className="outlinebtn2">
                    <Link to="/CourseOutline">
                      <button className="prev">Previous</button>
                    </Link> 
                    <Link to="/InstructorMaterials2">
                      <button>Next</button>
                    </Link>
                </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 1 && ""}
        </div>
      </div>
    </>
  );
};

export default InstructorMaterials;
