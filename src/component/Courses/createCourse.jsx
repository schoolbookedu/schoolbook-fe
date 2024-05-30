import { React, useState } from "react";
import { mutations } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { OverlayLoader } from "../../loaders";
import { useFormValidation } from "../../validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../error-message";
import { useOverlayLoader } from "../../hooks";
import { FileInput } from "./FileInput";

const createCourseFieldsToValidate = [
  "courseTitle",
  "courseCode",
  "courseObjectives",
];

export const CreateCourseElem = ({ setActiveTab }) => {
  const createCourseValidators = useFormValidation(
    createCourseFieldsToValidate
  );
  const { show, showing, hide } = useOverlayLoader();
  const { createCourse } = mutations;
  const [thumbnail, setThumbnail] = useState(null);
  const mutation = useMutation(createCourse, {
    onMutate: () => show(),
    onSuccess: () => {
      hide();
      setActiveTab(2);
    },
    onError: () => hide(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCourseValidators),
    defaultValues: {
      courseTitle: "",
      courseCode: "",
      courseObjectives: "",
    },
  });

  const onCreateCourse = async (data) => {
    await mutation.mutateAsync({
      title: data.courseTitle,
      courseCode: data.courseCode,
      objectives: data.courseObjectives,
      ...(thumbnail && {
        thumbnail,
      }),
    });
  };

  return (
    <>
      <div className="outline-container">
        <div className="outline-content">
          <form
            className="create-outline"
            onSubmit={handleSubmit(onCreateCourse)}
          >
            <div className="form">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col w-full md:w-[65%]">
                  <label>Course Title</label>
                  <input
                    type="text"
                    placeholder="eg: Programming for Beginners"
                    className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                    {...register("courseTitle")}
                  />
                  {errors.courseTitle && (
                    <ErrorMessage message={errors.courseTitle.message} />
                  )}
                </div>
                <div className="flex flex-col w-full md:w-[30%]">
                  <label>Course Code</label>
                  <input
                    type="text"
                    placeholder="Course code"
                    className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                    {...register("courseCode")}
                  />
                  {errors.courseCode && (
                    <ErrorMessage message={errors.courseCode.message} />
                  )}
                </div>
              </div>
              <label>Course Objective</label>
              <textarea
                type="text"
                placeholder="An overview of what the course is all about..."
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...register("courseObjectives")}
              />
              {errors.courseObjectives && (
                <ErrorMessage message={errors.courseObjectives.message} />
              )}
              <div className="coverPhoto">
                <div className="coverText">
                  <p>
                    <b>Add Course Cover Photo </b>
                  </p>
                  <span>
                    (This is the picture that will display as the home cover
                    when your course is viewed)
                  </span>
                </div>
                <div className="coverCreate">
                  <FileInput setThumbnail={setThumbnail} />
                </div>
              </div>
            </div>
            <div className="outlinebtn mt-[1.2rem]">
              <button type="submit">Create Course </button>
            </div>
          </form>
        </div>
      </div>
      <OverlayLoader showing={showing} />
    </>
  );
};
