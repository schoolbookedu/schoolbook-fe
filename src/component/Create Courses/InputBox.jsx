import { React, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./Create.css";

const InputBox = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
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
  return (
    <div className="inputbox" onClick={handleClick}>
      <input 
        type="file" 
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleImageUpload} 
        accept="image/*" />
        <FontAwesomeIcon
        icon={faPlusCircle}
        style={{ color: "#407BFF", fontSize: "24px" }}
      />
      {selectedImage && (
        <div className="image-container">
          <img src={selectedImage} alt="Selected" className="resized-image" />
      </div>
      )}
    </div>
  );
};

export default InputBox;
