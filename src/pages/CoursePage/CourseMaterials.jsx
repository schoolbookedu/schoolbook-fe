import React, { useMemo, useState } from "react";
import "./CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import banner from "../../utils/banner.png";
import Price from "../../component/Price Card/Price";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import { OverlayLoader } from "../../loaders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queries } from "../../api";

const tab = [{ id: 0, label: "Course Materials" }];

const CourseMaterials = () => {
  const [isFollowed, setIsFollowed] = useState(false);
const {id}  = useParams();
const courseId = id;
  console.log(courseId);

  const {
    data,
    isLoading,
    isError
  } = useQuery(["course"], () => getCourse(courseId), {
    enabled: !!courseId,})

  const course = useMemo(() => {
    if(data) {
      return data.data.resource
    }
    return null
  },[data])

  const handleClick = () => {
    setIsFollowed(!isFollowed);
  };

  const [activeTab, setActiveTab] = useState(0);

  const {getCourse} = queries;

  if (
  isLoading
) {
  return <OverlayLoader showing={true} />;
}




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
                  <Price price={course?.price}/>
                </div>
              </div>
              <div className="price-body">
                <div className="price-title">
                 <h2>{course.title}</h2>
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
                  <CourseObjective objectives={course?.objectives} />
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
