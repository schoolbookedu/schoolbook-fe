import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import MediaContent from "../Media Content/MediaContent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Create from "../Create Courses/Create";
import MaterialCardList from "../Outline Card/MaterialCardList";

const link = [
  { id: 1, list: "Course Intro" },
  { id: 0, list: "Outline" },
  { id: 2, list: "Preview" },
];

const OutlineCourse6 = ({
  onPrevious,
  materialCards,
  materialValue,
  setMaterialValue,
  isFileSelected,
  setMaterialCards,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const inputTitle = useSelector((state) => state.inputTitle);
  const inputObjective = useSelector((state) => state.inputObjective);
  const moduleTitle = useSelector((state) => state.moduleTitle);

  const handleTitleChange = (event) => {
    dispatch({ type: "UPDATE_TITLE_VALUE", payload: event.target.value });
  };
  const handleObjectiveChange = (event) => {
    dispatch({ type: "UPDATE_OBJECTIVE_VALUE", payload: event.target.value });
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);
    event.target.value = null;
    console.log(event.target.files);
    console.log(fileObj);
    console.log(fileObj.name);
  };

  const handleMaterialChange = (event) => {
    setMaterialValue(event.target.value);
  };

  const updateMaterial = () => {
    if (materialValue.trim() !== "") {
      setMaterialCards([...materialCards, materialValue]);
      setMaterialValue("");
    }
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
                  onChange={handleTitleChange}
                />
                <label>Course Objective</label>
                <textarea
                  type="text"
                  placeholder="An overview of what the course is all about..."
                  onChange={handleObjectiveChange}
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
                    <Create />
                  </div>
                </div>
              </div>
              <div className="outlinebtn">
                <button onClick={() => setActiveTab(0)}>Next</button>
              </div>
            </div>
          )}
          {activeTab === 0 && (
            <>
              <div className="outline-form">
                <label>Module Title</label>
                <input
                  type="text"
                  placeholder="e.g Introduction to Programming"
                  value={moduleTitle}
                />
              </div>
              <div className="outline-form">
                <h2>Module Materials</h2>
                <div className="outlineCard-container">
                  {/* <MaterialCardList materialCards={materialCards} /> */}
                </div>
                <div className="addmaterials">
                  <button>Add Materials</button>
                </div>
              </div>
              <div className="outline-form">
                <h2>Module Materials</h2>
                <div className="outline-form2">
                  <label>Material Title</label>
                  <input
                    type="text"
                    placeholder="e.g What is Programming"
                    onChange={handleMaterialChange}
                    value={materialValue}
                  />
                </div>
              </div>
              <div className="Attachfile">
                <label htmlFor="file-input">
                  <button onClick={handleClick}>
                    Attach File <FontAwesomeIcon icon={faPaperclip} />
                    <input
                      style={{ display: "none" }}
                      ref={inputRef}
                      type="file"
                      accept=".doc,.docx,.xml, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, .txt"
                      onChange={handleFileChange}
                    />
                  </button>
                </label>
                <button
                  className={isFileSelected ? "upload selected" : "upload"}
                  onClick={updateMaterial}
                >
                  Upload
                </button>
              </div>
              <div className="outlinebtn2">
                <button className="prev" onClick={onPrevious}>
                  Previous
                </button>
                <button onClick={() => setActiveTab(2)}>Next</button>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="preview-course">
                <h2>{inputTitle}</h2>
                <div className="preview-text">
                  <p>COURSE OBJECTIVE</p>
                  <p>{inputObjective}</p>
                  <p>
                    <b>{moduleTitle}</b>
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

export default OutlineCourse6;
