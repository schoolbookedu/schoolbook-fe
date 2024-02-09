import React from "react";
import { IoClose } from "react-icons/io5";
import { useFormValidation } from "../../validators";
import { useOverlayLoader } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { useMutation } from "@tanstack/react-query";
import { mutations } from "../../api";
import { showToast } from "../notifications";
import { OverlayLoader } from "../../loaders";

// Define fields to validate for creating a module
const createModuleFieldsToValidate = ["title"];

// EditModal component
const EditModal = ({ setEditModalVisible, courseId }) => {
  // Get validation schema
  const createModuleValidators = useFormValidation(
    createModuleFieldsToValidate
  );

  // Overlay loader hooks
  const { show, showing, hide } = useOverlayLoader();

  // Mutation hook for creating module
  const { createModule } = mutations;
  const mutation = useMutation(createModule, {
    onMutate: () => show(),
    onSuccess: () => {
      hide();
      setEditModalVisible(false);
    },
    onError: () => hide(),
  });

  // Close modal handler
  const handleCloseModal = () => {
    setEditModalVisible(false);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!courseId) return showToast("error", "Course ID is required");
    await mutation.mutateAsync({
      title: data.title,
      courseId: courseId,
    });
  };

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createModuleValidators),
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="modal-overlay">
      <div className="edit-modal md:w-[50%] w-90%] max-height overflow-y-scroll">
        <div className="flex flex-row justify-between align-center cursor-pointer">
          <IoClose
            onClick={handleCloseModal}
            className="cursor-pointer text-dark"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-10">
            <label className="text-dark">Course Module Title</label>
            <input
              type="text"
              placeholder="e.g Introduction to Programming"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm mt-2"
              {...register("title")}
            />
            {errors.title && <ErrorMessage message={errors.title.message} />}
          </div>
          <div className="outlinebtn2 mt-4">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default EditModal;
