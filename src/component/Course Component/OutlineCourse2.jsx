import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef } from "react";
import { faFile, faMusic, faPaperclip, faPlusCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import MediaContent from "../Media Content/MediaContent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputBox from "../Create Courses/InputBox";

const link = [
  { id: 1, list: "Course Intro" },
  { id: 0, list: "Outline" },
  { id: 2, list: "Preview" },
];
const OutlineCourse2 = ({ onNext, onPrevious, addCard }) => {
  const [activeTab, setActiveTab] = useState(0);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

 
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

  const handleInputChange = (event) => {
    setInputText(event.target.value);
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
                 <p><b>Add Course Cover Photo </b><span>(Optional)</span></p>
                 <span>(This is the picture that will display as the home cover when your course is viewed)</span>
               </div>
               <div className='coverCreate'>
                 <InputBox />
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
                <label>Course Module Title</label>
                <input 
                    type="text" 
                    placeholder="e.g Introduction to Programming" 
                    onChange={handleInputChange}
                    value={inputText}
                    />
              </div>
              <div className="outline-form">
                <h2>Course Module Materials</h2>
                <div className="modulebtn">
                    <button >Add Materials</button>
                    <div className="modulehover">
                        <ul>
                            <li onClick={handleClick}>
                                <FontAwesomeIcon icon={faVideo} /><br/>
                                <span>Video</span>
                                 <input
                                style={{ display: "none" }}
                                ref={inputRef}
                                type="file"
                                onChange={handleFileChange}
                                />
                            </li>
                            <li onClick={handleClick}>
                                <FontAwesomeIcon icon={faMusic} /><br/>
                                <span>Add Audio</span>
                                <input
                                style={{ display: "none" }}
                                ref={inputRef}
                                type="file"
                                onChange={handleFileChange}
                                />
                            </li>
                            <li onClick={handleClick}>
                                <FontAwesomeIcon icon={faFile} /><br/>
                                <span>Add Document</span>
                                <input
                                style={{ display: "none" }}
                                ref={inputRef}
                                type="file"
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

export default OutlineCourse2;
