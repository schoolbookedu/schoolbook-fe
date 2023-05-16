import {React, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Module = ({setShowModule}) => {
    const inputRef = useRef(null);
    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
      };
      const inputMaterial = useSelector((state) => state.inputMaterial);

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
    
      const handleButtonClose = () => {
        setShowModule(false);
      }
      
  return (
    <div className="module">
      <h3>Module Materials</h3>
      <input type="text" placeholder="Material Title" value={inputMaterial}/>
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
      <div className="outlinebtn2">
        <button 
        onClick={handleButtonClose}
        className="prev">
          Previous
        </button>
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default Module;
