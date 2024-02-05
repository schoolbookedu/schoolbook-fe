import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoClose } from "react-icons/io5";
import { faEdit, faFile, faMusic, faTrashAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import { mediaType } from "../../utils";

const AddMaterials = ({ setAddMaterialModalVisible, onUpload, initialData }) => {
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [editedMaterialIndex, setEditedMaterialIndex] = useState(null); // Initialize with null

  const handleCloseModal = () => {
    setAddMaterialModalVisible(false);
  };

  const handleClick = (inputRef) => {
    inputRef.current.click();
  };

//     const fileObj = event.target.files && event.target.files[0];
  
//     if (fileObj) {
//       let materialType;
  
//       // Check the file type and set materialType accordingly
//       if (fileObj.type.startsWith("audio/")) {
//         materialType = mediaType.AUDIO;
//       } else if (fileObj.type.startsWith("video/")) {
//         materialType = mediaType.VIDEO;
//       } else if (
//         fileObj.type.startsWith("application/") ||
//         fileObj.type.startsWith("text/") ||
//         fileObj.type === "application/pdf"
//       ) {
//         materialType = mediaType.DOCUMENT;
//       } else {
//         // Handle the case where an invalid file type is selected
//         console.log(
//           "Invalid file type. Please select an audio, video, or document file."
//         );
//         // Optionally, you can provide feedback to the user
//         return;
//       }
  
//       const newMaterial = {
//         title: fileObj.name,
//         materialTitle: materialTitle,
//         type: materialType,
//       };
  
//       // If editing, update the material at the editedMaterialIndex
//       if (editedMaterialIndex !== null) {
//         const updatedMaterials = [...uploadedMaterials];
//         updatedMaterials[editedMaterialIndex] = newMaterial;
//         setUploadedMaterials(updatedMaterials);
//         setEditedMaterialIndex(null); // Reset after updating
//       } else {
//         // If not editing, add a new material to the list
//         setUploadedMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
//       }
  
//       setMaterialTitle(""); // Clear materialTitle after adding to the list
//       console.log("Uploaded Materials:", uploadedMaterials);
//     }
//   };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];

    if (fileObj) {
      let materialType;

     
      if (fileObj.type.startsWith("audio/")) {
        materialType = mediaType.AUDIO;
      } else if (fileObj.type.startsWith("video/")) {
        materialType = mediaType.VIDEO;
      } else if (
        fileObj.type.startsWith("application/") ||
        fileObj.type.startsWith("text/") ||
        fileObj.type === "application/pdf"
      ) {
        materialType = mediaType.DOCUMENT;
      } else {
      
        console.log(
          "Invalid file type. Please select an audio, video, or document file."
        );
        
        return;
      }

      const newMaterial = {
        title: fileObj.name,
        materialTitle: materialTitle,
        type: materialType,
      };

      if (editedMaterialIndex !== null) {
       
        const updatedMaterials = [...uploadedMaterials];
        updatedMaterials[editedMaterialIndex] = newMaterial;
        setUploadedMaterials(updatedMaterials);
        setEditedMaterialIndex(null); 
      } else {
        
        setUploadedMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
      }

      setMaterialTitle(""); 
      console.log("Uploaded Materials:", uploadedMaterials);
    }
  };
  
  const handleMaterialTitleChange = (event) => {
    setMaterialTitle(event.target.value);
  };

//     if (materialTitle.trim() !== "" && uploadedMaterials.length > 0) {
//       // Send data to parent component
//       onUpload({
//         moduleTitle: moduleTitle,
//         materialTitle: materialTitle,
//         uploadedMaterials: uploadedMaterials,
//       });

//       // Clear the form after uploading
//       setMaterialTitle("");
//       setUploadedMaterials([]);
//       setAddMaterialModalVisible(false);
//     } else {
//       // Handle case where either materialTitle or uploadedMaterials is empty
//       console.log("Please provide a material title and upload materials.");
//     }
//   };
// const handleUpload = () => {
//     if (materialTitle.trim() !== "" && uploadedMaterials.length > 0) {
//       // Send data to parent component
//       onUpload({
//         moduleTitle: moduleTitle,
//         materialTitle: materialTitle,
//         uploadedMaterials: uploadedMaterials,
//       });
  
//       // Clear the form after uploading
//       setMaterialTitle("");
//       setUploadedMaterials([]);
//       setAddMaterialModalVisible(false);
//       console.log("Modal closed");
//     } else {
//       // Handle case where either materialTitle or uploadedMaterials is empty
//       console.log("Please provide a material title and upload materials.");
//     }
//   };
  const handleUpload = () => {
    if (moduleTitle.trim() !== "" && uploadedMaterials.length > 0) {

      onUpload({
        moduleTitle: moduleTitle,
        materialTitle: materialTitle,
        uploadedMaterials: uploadedMaterials,
      });

      setModuleTitle("");
      setMaterialTitle("");
      setUploadedMaterials([]);
      setAddMaterialModalVisible(false);
      console.log("Modal closed");
    } else {
      
      console.log("Please provide a module title and upload materials.");
    }
  };

  const handleDelete = (index) => {
    const updatedMaterials = [...uploadedMaterials];
    updatedMaterials.splice(index, 1);
    setUploadedMaterials(updatedMaterials);
  };

  const handleEdit = (index) => {
  
    setEditedMaterialIndex(index);
    setMaterialTitle(uploadedMaterials[index].materialTitle);

    const editedMaterial = {
      title: uploadedMaterials[index].title,
      materialTitle: uploadedMaterials[index].materialTitle,
      type: mediaType,
    };
  
    const updatedMaterials = [...uploadedMaterials];
    updatedMaterials[index] = editedMaterial;
    setUploadedMaterials(updatedMaterials);
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal md:w-[50%] w-90%] max-height overflow-y-scroll">
        <div className="flex flex-row justify-between align-center cursor-pointer">
          <h2>{""}</h2>
          <IoClose onClick={handleCloseModal} className="cursor-pointer text-dark" />
        </div>
        <>
          <div className="flex flex-col mt-10">
            <label className="text-dark">Material Title</label>
            <input
              type="text"
              placeholder="e.g Material Title (Optional)"
              value={materialTitle}
              onChange={handleMaterialTitleChange}
              className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm mt-2"
            />
          </div>
          <div className="Attachfile">
            <div className="addmaterials">
              <div className="modulebtn ">
                <button>Add Materials</button>
                <div className="modulehover">
                  <ul>
                    <li onClick={() => handleClick(videoInputRef)}>
                      <FontAwesomeIcon icon={faVideo} />
                      <br />
                      <span className="text-center">Add Video</span>
                      <input
                        style={{ display: "none" }}
                        ref={videoInputRef}
                        type="file"
                        accept=".mp4,.mp3/*"
                        onChange={handleFileChange}
                      />
                    </li>
                    <li onClick={() => handleClick(audioInputRef)}>
                      <FontAwesomeIcon icon={faMusic} />
                      <br />
                      <span className="text-center">Add Audio</span>
                      <input
                        style={{ display: "none" }}
                        ref={audioInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                      />
                    </li>
                    <li onClick={() => handleClick(documentInputRef)}>
                      <FontAwesomeIcon icon={faFile} />
                      <br />
                      <span className="text-center">Add Document</span>
                      <input
                        style={{ display: "none" }}
                        ref={documentInputRef}
                        type="file"
                        accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.txt"
                        onChange={handleFileChange}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {uploadedMaterials.length > 0 && (
            <div className="uploaded-materials">
              <h3>Materials</h3>
              <ul>
                {uploadedMaterials.map((material, index) => (
                  <div className="w-full pt-2 flex flex-row justify-between border-t border-t-[#c0c0c0] mt-2">
                    <li key={index} className="text-sm capitalize border-0">
                      {material.materialTitle} - {material.title}
                    </li>
                    <div>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="ml-2 cursor-pointer text-red-500"
                        onClick={() => handleDelete(index)}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="ml-2 cursor-pointer text-blue-500"
                        onClick={() => handleEdit(index)}
                      />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="outlinebtn2 mt-4">
            <button onClick={handleUpload}>Upload</button>
          </div>
        </>
      </div>
    </div>
  );
};

export default AddMaterials;
