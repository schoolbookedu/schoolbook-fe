import { React, useState } from "react";
import "../CoursePage/CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import banner from "../../utils/banner.png";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import { useSelector } from 'react-redux';
import './InstructorEdit.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const tab = [{ id: 0, label: "Course Materials" }];


const InstructorEdit = () => {
    const [activeTab, setActiveTab] = useState(0);
    const inputTitle = useSelector((state) => state.inputTitle);
  return (
    <div>
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
              <div className="price-body">
                    <div className="price-title">
                        <h2>{inputTitle}</h2>
                        <span>Tutor: Prof John Tobiloba</span>
                    </div>
                    <div className="edit-section">
                    <div className="edit-btn">
                    <button className="save">Save changes</button>
                    <button className="edit">Edit {" "}
                        <FontAwesomeIcon icon= {faPen} />
                    </button>
                </div>
                    </div>
                <div className="objectivetab-container">
                  <CourseObjective />
                </div>
                
              </div>
            </div>
          )}
          {activeTab === 1 && ""}
        </div>
      </div>
    </div>
  )
}

export default InstructorEdit