// OutlineCard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEllipsisVertical, IoClose } from "react-icons/io5";
import "./OutlineCard.css";
import EditModal from "../Modals/EditModal";
import AddMaterials from "../Modals/AddMaterials";

const CardOptions = ({ onEdit, onDelete, addMaterials }) => (
  <div className="option">
    <span onClick={onEdit}>Edit Module</span>
    <span onClick={addMaterials}>Add Materials</span>
    <span onClick={onDelete}>Delete Module</span>
  </div>
);

const OutlineCard = ({ moduleId, index, moduleTitle, courseId }) => {
  const navigate = useNavigate();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addMaterialModalVisible, setAddMaterialModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const courseContent = () => {
    navigate("/course-content/" + courseId);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setOptionsVisible(!optionsVisible);
  };

  const handleEdit = () => {
    setOptionsVisible(false);
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    setOptionsVisible(false);
    setDeleteModalVisible(true);
  };

  const handleAddMaterials = () => {
    setOptionsVisible(false);
    setAddMaterialModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setAddMaterialModalVisible(false); // Close AddMaterialModal
    setDeleteModalVisible(false);
  };

  return (
    <>
      <div className="outline-card">
        <div className="flex justify-end" onClick={toggleOptions}>
          <IoEllipsisVertical className="text-dark" />
        </div>
        {optionsVisible && (
          <CardOptions
            onEdit={handleEdit}
            onDelete={handleDelete}
            addMaterials={handleAddMaterials}
          />
        )}
        <span>Module {index}</span>
        <h3 onClick={courseContent}>{moduleTitle}</h3>
      </div>
      {editModalVisible && (
        <EditModal
          setEditModalVisible={setEditModalVisible}
          title={moduleTitle}
          courseId={courseId}
          moduleId={moduleId}
        />
      )}
      {addMaterialModalVisible && (
        <AddMaterials
          setAddMaterialModalVisible={setAddMaterialModalVisible}
          courseId={courseId}
          moduleId={moduleId}
        />
      )}
      {deleteModalVisible && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="flex flex-row justify-between align-center">
              {/* <h2></h2> */}
              <IoClose onClick={handleCloseModal} />
            </div>
            <div className="p-10">
              <h2>Are you sure you want to Delete?</h2>
              <div className="flex flex-row justify-between pt-10">
                <button
                  onClick={() => {
                    setDeleteModalVisible(false);
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteModalVisible(false)}
                  className="bg-white text-[#407BFF] border-[#407BFF] border-2"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OutlineCard;
