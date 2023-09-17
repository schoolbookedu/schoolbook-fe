import { React, useState, useRef } from "react";
import MediaContent from "../Media Content/MediaContent";
import { Link } from "react-router-dom";
import "./CourseOutline.css";
import InputBox from "../Create Courses/InputBox";
import { mutations } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useOverlayLoader } from "../../hooks";
import { OverlayLoader } from "../../loaders";
import axios from "axios";

const link = [
  { id: 1, list: "Course Intro" },
  { id: 0, list: "Outline" },
  { id: 2, list: "Preview" },
];
const videoLink = [{ id: 0, list: "Introduction to programming" }];

const OutlineCourse3 = ({
  onNext,
  onPrevious,
  cards,
  courseDetails,
  setCourseDetails,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const { createCourse } = mutations;

  // Inside your component
  const { show, showing, hide } = useOverlayLoader();

  const mutation = useMutation(createCourse, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  const createCourseRequest = () => {
    console.log(courseDetails);
    const response = mutation.mutate(courseDetails);
    console.log(response);
  };

  return (
    <>
      <div className="outline-container">
        <div className="outline-list">
          {link.map((link) => (
            <button
              key={link.id}
              className={activeTab === link.id ? "active" : ""}
              onClick={() => setActiveTab(link.id)}
            >
              {link.list}
            </button>
          ))}
        </div>
        <div className="outline-content">
          {activeTab === 1 && (
            <div className="create-outline">
              <div className="form">
                <label>Course Title</label>
                <input
                  type="text"
                  placeholder="eg: Programming for Beginners"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      title: e.target.value,
                    })
                  }
                />
                <label>Course Objective</label>
                <textarea
                  type="text"
                  placeholder="An overview of what the course is all about..."
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      objectives: e.target.value,
                    })
                  }
                />
                <div className="coverPhoto">
                  <div className="coverText">
                    <p>
                      <b>Add Course Cover Photo </b>
                      <span>(Optional)</span>
                    </p>
                    <span>
                      (This is the picture that will display as the home cover
                      when your course is viewed)
                    </span>
                  </div>
                  <div className="coverCreate">
                    <InputBox
                      courseDetails={courseDetails}
                      setCourseDetails={setCourseDetails}
                    />
                  </div>
                </div>
              </div>
              <div className="outlinebtn">
                <button onClick={() => setActiveTab(1)}>Next</button>
              </div>
            </div>
          )}
          {activeTab === 0 && (
            <>
              <div className="outline-form">
                <h2>Price</h2>
                <div className="outlineCard-container">
                  <input
                    type="text"
                    placeholder="Course Price"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="outlinebtn2">
                <button onClick={createCourseRequest}>Submit</button>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="preview-course">
                <h2>{courseDetails.title}</h2>
                <div className="preview-text">
                  <p>COURSE OBJECTIVE</p>
                  <p>{courseDetails.objectives}</p>
                  <p>
                    <b>{courseDetails.outlines.materialTitle}</b>
                  </p>
                </div>
                <MediaContent />
              </div>
              <div className="outlinebtn2">
                <button className="prev" onClick={() => setActiveTab(1)}>
                  Previous
                </button>
                <Link to="/InstructorMaterials">
                  <button type="submit">Next</button>
                </Link>
              </div>
            </>
          )}
        </div>
        <OverlayLoader showing={showing} />
      </div>
    </>
  );
};

export default OutlineCourse3;
