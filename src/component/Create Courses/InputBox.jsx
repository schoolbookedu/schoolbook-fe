import { React, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./Create.css";

const InputBox = ({courseDetails, setCourseDetails}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null);
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        const reader = new FileReader();
    
        reader.onload = (e) => {
            const thumbnailString = e.target.result;
            setCourseDetails({
                ...courseDetails,
                thumbnail: thumbnailString,
            });
        };
    
        reader.readAsDataURL(file);
    };

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };


  return (
    <div className="inputbox" onClick={handleClick}>
      <input 
        type="file" 
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleImageUpload} 
        // onChange={(e) => }
        accept="image/png, image/gif, image/jpeg"/>
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
