import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../Create Courses/Create.css";

export const FileInput = ({ setThumbnail }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbnail(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="mt-[1.2rem] inputbox" onClick={handleClick}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={(e) => {
          inputRef.current = e;
        }}
        onChange={handleImageUpload}
        accept="image/png, image/gif, image/jpeg"
      />

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
