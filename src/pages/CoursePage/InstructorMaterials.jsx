import { React, useState } from "react";
import "./CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import banner from "../../utils/banner.png";
import Price from "../../component/Price Card/Price";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import InstructorPrice from "../../component/Price Card/InstructorPrice";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const tab = [{ id: 0, label: "Course Materials" }];

const InstructorMaterials = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 👇️ navigate programmatically
    localStorage.setItem('price', value);
    navigate(`/InstructorMaterials2`, value);
  };
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
                  <InstructorPrice  onSubmit={setValue} value={value}/>
                </div>
              </div>
              <div className="price-body">
                <div className="price-title">
                  <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
                </div>
                <div className="objectivetab-container">
                  <CourseObjective />
                </div>
                <div className="outlinebtn2">
                    <Link to="/CourseOutline">
                    <button className="prev">Previous</button>
                    </Link>
                    <button type="submit" onClick={handleSubmit}>Next</button>
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
