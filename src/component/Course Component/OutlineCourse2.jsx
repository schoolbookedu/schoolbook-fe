import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef } from "react";
import { faFile, faMusic, faVideo } from "@fortawesome/free-solid-svg-icons";
import MediaContent from "../Media Content/MediaContent";
import { Link } from "react-router-dom";
import InputBox from "../Create Courses/InputBox";

const link = [
  { id: 1, list: "Course Intro" },
  { id: 0, list: "Outline" },
  { id: 2, list: "Preview" },
];
const OutlineCourse2 = ({
  onNext,
  onPrevious,
  inputValue,
  setInputValue,
  courseDetails,
  setCourseDetails,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const inputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (fileObj) {
      setCourseDetails({
        ...courseDetails,
        outlines: { materialTitle: "", materialid: event.target.files[0] },
      });
      setSelectedFileName(fileObj.name);
    }
    if (!fileObj) {
      return;
    }

    // console.log("fileObj is", fileObj);
    // event.target.value = null;
    // console.log(event.target.files);
    // console.log(fileObj);
    // console.log(fileObj.name);
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
          {activeTab === 0 && (
            <>
              <div className="outline-form">
                <label>Course Material Title</label>
                <input
                  type="text"
                  placeholder="e.g Introduction to Programming"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      outlines: { materialTitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="outline-form">
                <h2>Course Materials</h2>
                <div className="modulebtn">
                  <button>Add Materials</button>
                  {selectedFileName && <p>{selectedFileName}</p>}
                  <div className="modulehover">
                    <ul>
                      <li onClick={handleClick}>
                        <FontAwesomeIcon icon={faVideo} />
                        <br />
                        <span>Video</span>
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          accept="video/mp4,video/x-m4v,video/*"
                          onChange={handleFileChange}
                        />
                      </li>
                      <li onClick={handleClick}>
                        <FontAwesomeIcon icon={faMusic} />
                        <br />
                        <span>Add Audio</span>
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          accept=".mp3,audio/*"
                          onChange={handleFileChange}
                        />
                      </li>
                      <li onClick={handleClick}>
                        <FontAwesomeIcon icon={faFile} />
                        <br />
                        <span>Add Document</span>
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          accept=".doc,.docx,.xml, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, .txt"
                          onChange={handleFileChange}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="outlinebtn2">
                <button className="prev" onClick={onPrevious}>
                  Previous
                </button>
                <button onClick={onNext}>Next</button>
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
      </div>
    </>
  );
};

export default OutlineCourse2;
