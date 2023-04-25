import { React, useState } from "react";
import "./CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import banner from "../../utils/banner.png";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import Price2 from "../../component/Price Card/Price2";
import { useSelector } from 'react-redux';

const tab = [{ id: 0, label: "Course Materials" }];

const InstructorMaterials2 = () => {
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
                  <Price2 />
                </div>
              </div>
              <div className="price-body">
                <div className="price-title">
                  <h2>{inputTitle}</h2>
                </div>
                <div className="objectivetab-container">
                  <CourseObjective />
                </div>
                <div className="outlinebtn2">
                    <button type="submit">Upload</button>
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

export default InstructorMaterials2;
