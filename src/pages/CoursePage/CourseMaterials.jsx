import { React, useState } from "react";
import "./CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import banner from "../../utils/banner.png";
import Price from "../../component/Price Card/Price";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import { useSelector } from 'react-redux';

const tab = [{ id: 0, label: "Course Materials" }];

const CourseMaterials = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleClick = () => {
    setIsFollowed(!isFollowed);
  };

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
                  <Price />
                </div>
              </div>
              <div className="price-body">
                <div className="price-title">
                  <h2>{inputTitle}</h2>
                </div>
                <div className="price-followbtn">
                  <span>Tutor: Prof John Tobiloba</span>
                  <button
                    className={isFollowed ? "followed" : "follow"}
                    onClick={handleClick}
                  >
                    {isFollowed ? "Followed" : "Follow"}
                  </button>
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
    </>
  );
};

export default CourseMaterials;
