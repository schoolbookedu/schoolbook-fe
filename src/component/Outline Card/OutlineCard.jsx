// OutlineCard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEllipsisVertical, IoClose } from "react-icons/io5";
import "./OutlineCard.css";
import EditModal from "../Modals/EditModal";
import AddMaterials from "../Modals/AddMaterials";
import { useMutation } from "@tanstack/react-query";
import { useOverlayLoader } from "../../hooks";
import { mutations } from "../../api";
import { OverlayLoader } from "../../loaders";
import { USER_TYPE } from "../../utils";

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
  const { show, showing, hide } = useOverlayLoader();
  const { deleteModule } = mutations;

  const mutation = useMutation(deleteModule, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

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

  const handleModuleDelete = (id) => {
    mutation.mutateAsync(id);
    setDeleteModalVisible(false);
  };

  const userType = sessionStorage.getItem("userType") ?? undefined;

  return (
    <>
      <div className="outline-card">
      {userType && userType === USER_TYPE.INSTRUCTOR && (
        <div className="flex justify-end" onClick={toggleOptions}>
          <IoEllipsisVertical className="text-dark" />
        </div>
      )}
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
              <h2 className="text-sm text-dark-200">
                Are you sure you want to Delete?
              </h2>
              <div className="flex flex-row justify-between pt-10">
                <button onClick={() => handleModuleDelete(moduleId)}>
                  Yes
                </button>
                <button
                  onClick={() => setDeleteModalVisible(false)}
                  className="bg-white text-[#407BFF] border-[#407BFF] border-2 hover:bg-[#407BFF] hover:text-white"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <OverlayLoader showing={showing} />
    </>
  );
};

export default OutlineCard;
