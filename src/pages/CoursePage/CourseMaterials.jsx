import React, { useEffect, useMemo, useState } from "react";
import "./CourseMaterials.css";
import Nav from "../../component/Navbar/Nav";
import CourseObjective from "../../component/Course Objective Tab/CourseObjective";
import { OverlayLoader } from "../../loaders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queries } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setObjective, selectUI } from "../../store/inputSlice";
import { USER_TYPE } from "../../utils";

const tab = [{ id: 0, label: "Course Materials" }];

const CourseMaterials = () => {
  // const [isFollowed, setIsFollowed] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const { id } = useParams();
  const courseId = id;
  const dispatch = useDispatch();
  const { title } = useSelector(selectUI);
  // console.log(courseId);


  const userType = sessionStorage.getItem("userType") ?? undefined;

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

  // const handleClick = () => {
  //   setIsFollowed(!isFollowed);
  // };

  const [activeTab, setActiveTab] = useState(0);

  const { getCourse } = queries;
  // console.log(course);
  useEffect(() => {
    if (course?.title) {
      setEditTitle(course?.title);
    }
  }, []);

  // if (isLoading) {
  //   return <OverlayLoader showing={true} />;
  // }

  const editText = () => {
    setEdit(!edit);
  };

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };

  const handleObjectiveChange = (event) => {
    dispatch(setObjective(event.target.value));
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
                <h2>
                {course?.title}
                </h2>
                  {/* <input
                    type="text"
                    value= {course?.title}
                    onChange={handleTitleChange}
                    readOnly={!edit}
                  /> */}
                </div>
                <div className="price-followbtn mt-4">
                  {/* <span>Tutor: {course?.tutor?.fullName}</span> */}
                  {/* <button
                    className={isFollowed ? "followed" : "follow"}
                    onClick={handleClick}
                  >
                    {isFollowed ? "Followed" : "Follow"}
                  </button> */}
                {/* {userType && userType === USER_TYPE.INSTRUCTOR && (
                  <div className="flex justify-between">
                    <button className="followed" onClick={editText}>
                      Edit
                    </button>
                    <button className="follow">Save</button>
                  </div>
                    )} */}
                </div>
                <div className="objectivetab-container">
                  <CourseObjective
                    objectives={course?.objectives}
                    materials={course?.outlines}
                    edit={edit}
                    handleObjectiveChange={handleObjectiveChange}
                    courseId={courseId}
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
