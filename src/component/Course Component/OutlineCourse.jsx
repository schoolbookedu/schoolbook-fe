import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef } from "react";
import { faPaperclip, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import MediaContent from "../Media Content/MediaContent";
import { Link } from "react-router-dom";

const link = [
  { id: 0, list: "Course Intro" },
  { id: 1, list: "Outline" },
  { id: 2, list: "Preview" },
];
const OutlineCourse = () => {
  const [activeTab, setActiveTab] = useState(0);
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    // reset file input
    event.target.value = null;

    // its now empty
    console.log(event.target.files);

    // can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
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
          {activeTab === 0 && (
            <div className="create-outline">
              <div className="form">
                <input type="text" placeholder="Course Title" />
                <input type="text" placeholder="Course Objective" />
              </div>
              <div className="outlinebtn">
                <button onClick={() => setActiveTab(1)}>Next</button>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <>
              <div className="outline-form">
                <input type="text" placeholder="Title" />
              </div>
              <div className="outline-form">
                <h2>Course Materials</h2>
                <input type="text" placeholder="Material Title" />
                <div className="outline-btn">
                  <label htmlFor="file-input">
                    <button onClick={handleClick}>
                      Attach file <FontAwesomeIcon icon={faPaperclip} />
                    </button>
                  </label>
                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="outline-form">
                <h2>Cover Page Picture</h2>
                <div className="outline-create" onClick={handleClick}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "#407BFF", fontSize: "24px" }}
                  />
                  <p>Add File</p>
                </div>
              </div>
              <div className="outlinebtn2">
                <button 
                className="prev"
                onClick={() => setActiveTab(0)}>Previous</button>
                <button onClick={() => setActiveTab(2)}>Next</button>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="preview-course">
                <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
                <div className="preview-text">
                  <p>COURSE OBJECTIVE</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam
                    condimentum,vel euismod erat placerat. In iaculis arcu eros,
                    eget tempus orci facilisis id.Lorem ipsum dolor sit
                  </p>
                  <p><b>FUNDAMENTALS OF GRAPHIC DESIGN</b></p>
                </div>
                <MediaContent />
              </div>
              <div className="outlinebtn2">
              <button 
              className="prev"
              onClick={() => setActiveTab(1)}>Previous</button>
                <Link to="/InstructorMaterials">
                    <button>Next</button>
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
