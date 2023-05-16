import { React, useState} from "react";
import MediaContent from "../Media Content/MediaContent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Create from "../Create Courses/Create";

const link = [
  { id: 0, list: "Course Intro" },
  { id: 1, list: "Outline" },
  { id: 2, list: "Preview" },
];
const OutlineCourse = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    dispatch({ type: "UPDATE_TITLE_VALUE", payload: event.target.value });
  };
  const inputTitle = useSelector((state) => state.inputTitle);

  const handleObjectiveChange = (event) => {
    dispatch({ type: "UPDATE_OBJECTIVE_VALUE", payload: event.target.value });
  };
  const inputObjective = useSelector((state) => state.inputObjective);
  const inputMaterial = useSelector((state) => state.inputMaterial);

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
                    <p><b>Add Course Cover Photo </b><span>(Optional)</span></p>
                    <span>(This is the picture that will display as the home cover when your course is viewed)</span>
                  </div>
                  <div className='coverCreate'>
                    <Create />
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
                <h2>{inputTitle}</h2>
                <div className="preview-text">
                  <p>COURSE OBJECTIVE</p>
                  <p>{inputObjective}</p>
                  <p>
                    <b>{inputMaterial}</b>
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

export default OutlineCourse;
