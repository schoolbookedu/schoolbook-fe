import { React, useState } from "react";
import MediaContent from "../Media Content/MediaContent";
import { Link } from "react-router-dom";
import InputBox from "../Create Courses/InputBox";

const link = [
  { id: 0, list: "Course Intro" },
  { id: 1, list: "Outline" },
  { id: 2, list: "Preview" },
];
const OutlineCourse = ({ onNext, cards, courseDetails, setCourseDetails }) => {
  const [activeTab, setActiveTab] = useState(0);

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
          {activeTab === 0 && (
            <div className="create-outline">
              <div className="form">
                <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col w-full md:w-[65%]">
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
                </div>
                 <div className="flex flex-col w-full md:w-[30%]">
                 <label>Course Code</label>
                 <input
                  type="text"
                  placeholder="Course code"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      courseCode: e.target.value,
                    })
                  }
                />  
                </div>
                  </div>
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
          {activeTab === 1 && (
            <>
              <div className="Outlinemodule">
                <button onClick={onNext}>Course Module</button>
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
                {/* <MediaContent cards={cards} /> */}
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
      </div>
    </>
  );
};

export default OutlineCourse;
