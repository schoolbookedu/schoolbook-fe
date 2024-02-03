import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEllipsisVertical, IoClose } from "react-icons/io5";
import "./OutlineCard.css";
import EditModal from "../Modals/EditModal";

const CardOptions = ({ onEdit, onDelete }) => (
  <div className="option">
    <span onClick={onEdit}>Edit</span>
    <span onClick={onDelete}>Delete</span>
  </div>
);

const OutlineCard = ({ index, moduleTitle }) => {
  const navigate = useNavigate();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const courseContent = () => {
    navigate("/course-content");
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setOptionsVisible(!optionsVisible);
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    setOptionsVisible(false);
    setEditModalVisible(true);
  };
  const handleDelete = () => {
    setOptionsVisible(false);
    setDeleteModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);  
  };

  return (
    <>
    <div className="outline-card">
      <div className="flex justify-end" onClick={toggleOptions}>
        <IoEllipsisVertical className="text-dark"/>
      </div>
      {optionsVisible && (
        <CardOptions onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <span>Module {index}</span>
      <h3 onClick={courseContent}>{moduleTitle}</h3>
    </div>
     {editModalVisible && 
      <EditModal setEditModalVisible={setEditModalVisible}/>
    }
      {deleteModalVisible && 
      <div className="modal-overlay">
      <div className="edit-modal">
        <div className="flex flex-row justify-between align-center">
        <h2></h2>
        <IoClose onClick={handleCloseModal} />
        </div>
        <div className="p-10">
          <h2>Are you sure you want to Delete?</h2>
          <div className="flex flex-row justify-between pt-10">
            <button onClick={()=>{setDeleteModalVisible(false)}}>Yes</button>
            <button onClick={()=>setDeleteModalVisible(false)}
           className="bg-white text-[#407BFF] border-[#407BFF] border-2">No</button> 
          </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default OutlineCard;
