import React, { useEffect, useMemo, useState } from "react";
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
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const { id } = useParams();
  const courseId = id;
  // console.log(courseId);

  const { data, isLoading, isError } = useQuery(
    ["course"],
    () => getCourse(courseId),
    {
      enabled: !!courseId,
    }
  );

  const course = useMemo(() => {
    if (data) {
      return data?.data?.resource;
    }
    return null;
  }, [data]);

  const handleClick = () => {
    setIsFollowed(!isFollowed);
  };

  const [activeTab, setActiveTab] = useState(0);

  const { getCourse } = queries;
  useEffect(()=>{
    if (course?.title){
      setEditTitle(course?.title);
    }
},[])

  if (isLoading) {
    return <OverlayLoader showing={true} />;
  }

  const editText=()=>{
      setEdit(!edit);
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
        <div className="price-content w-full">
          {activeTab === 0 && (
            <div className="course-container">
              <div className="banner">
                <img src={course?.thumbnail} alt="banner" />
              </div>
              {/* <div className="price">
                <div className="price-container">
                  <Price price={course?.price} />
                </div>
              </div> */}
              <div className="price-body">
                <div className="price-title">
                  <input type="text"  value={course?.title} onChange={(e)=>setEditTitle(e.target.value)}/>
                </div>
                <div className="price-followbtn">
                  <span>Tutor: {course?.tutor?.fullName}</span>
                  {/* <button
                    className={isFollowed ? "followed" : "follow"}
                    onClick={handleClick}
                  >
                    {isFollowed ? "Followed" : "Follow"}
                  </button> */}
                    <div className="flex justify-between">
                  <button className="followed"
                  onClick={editText}>Edit</button>
                  <button className="follow">Save</button>
                </div>
                </div>
                <div className="objectivetab-container">
                  <CourseObjective
                    objectives={course?.objectives}
                    materials={course?.outlines}
                    edit={edit}
                  />
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
