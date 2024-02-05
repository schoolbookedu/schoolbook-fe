import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const EditModal = ({ setEditModalVisible, onUpload, initialData }) => {
  const [moduleTitle, setModuleTitle] = useState(initialData ? initialData.moduleTitle : "");

  const handleCloseModal = () => {
    setEditModalVisible(false);
  };

  const handleTitleChange = (event) => {
    setModuleTitle(event.target.value);
  };

  const handleUpload = () => {
    if (moduleTitle.trim() !== "") {
      onUpload({
        moduleTitle: moduleTitle,
      });

      setModuleTitle("");
      setEditModalVisible(false);
    } else {
      console.log("Please provide a module title.");
    }
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
            <label className="text-dark">Course Module Title</label>
            <input
              type="text"
              placeholder="e.g Introduction to Programming"
              value={moduleTitle}
              onChange={handleTitleChange}
              className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm mt-2"
            />
          </div>
          <div className="outlinebtn2 mt-4">
            <button onClick={handleUpload}>Save</button>
           </div>
         </>
       </div>
     </div>
   );
 };

export default EditModal;
