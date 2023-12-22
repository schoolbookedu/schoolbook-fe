import { React, useState, useRef } from "react";
import MediaContent from "../Media Content/MediaContent";
import { Link } from "react-router-dom";
import "./CourseOutline.css";
import InputBox from "../Create Courses/InputBox";
import { mutations } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useOverlayLoader } from "../../hooks";
import { OverlayLoader } from "../../loaders";
import axios from "axios";
import { showToast } from "../notifications";

const link = [
  { id: 1, list: "Course Intro" },
  { id: 0, list: "Outline" },
  { id: 2, list: "Preview" },
];
const videoLink = [{ id: 0, list: "Introduction to programming" }];

const mediaType = {
  VIDEO: "Video",
  AUDIO: "Audio",
  DOCUMENT: "Document",
};

const OutlineCourse3 = ({
  onNext,
  onPrevious,
  cards,
  courseDetails,
  setCourseDetails,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const { createCourse, createMaterial } = mutations;

  // Inside your component
  const { show, showing, hide } = useOverlayLoader();

  const materialMutation = useMutation(createMaterial, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  const mutation = useMutation(createCourse, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  const createCourseRequest = async () => {
    console.log({ courseDetails });

    const materialOutlines = courseDetails?.outlines;
    if (materialOutlines?.materialId) {
      const fileType = materialOutlines?.materialId?.type;
      const formData = new FormData()
      formData.append("title",materialOutlines.materialTitle)
      formData.append('mediaURL', materialOutlines.materialId)
      formData.append('type', 
      fileType?.includes("video")
      ? mediaType.VIDEO
      : fileType?.includes("audio")
      ? mediaType.AUDIO
      : mediaType.DOCUMENT)
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const material = await materialMutation.mutateAsync(
        formData,
      );

      console.log({ material });

      if (material?._id) {
        const createCoursePayload = {
          ...courseDetails,
          outlines: {
            ...courseDetails?.outlines,
            materialId: material?._id,
          },
        };
        console.log({createCourse})
        const course = await mutation.mutateAsync({
          ...createCoursePayload,
        });
        if (course?._id){
          showToast("Course created Successful", { type: "success"});
          setActiveTab(2);
          return;
        }else{
          showToast("Failed", {type: "Fail" } );
          };
         
        
        
        console.log({ course });
      }
    } else {
      return showToast("Please upload a course material", { type: "error" });
    }
  };

  return (
    <>
      <div className="outline-container">
        <div className="outline-list">
          {link.map((link) => (
            <button
              key={link.id}
              className={activeTab === link.id ? "active" : ""}
              onClick={() => setActiveTab(link.id)}
            >
              {link.list}
            </button>
          ))}
        </div>
        <div className="outline-content">
          {activeTab === 1 && (
            <div className="create-outline">
              <div className="form">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col w-full md:w-[65%]">
                    <label>Course Title</label>
                    <input
                      type="text"
                      placeholder="eg: Programming for Beginners"
                      className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                      onChange={(e) =>
                        setCourseDetails({
                          ...courseDetails,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-[30%]">
                    <label>Course Code</label>
                    <input
                      type="text"
                      placeholder="Course code"
                      className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                      onChange={(e) =>
                        setCourseDetails({
                          ...courseDetails,
                          courseCode: e.target.value, 
                        })
                      }
                    />
                  </div>
                </div>
                <label>Course Objective</label>
                <textarea
                  type="text"
                  placeholder="An overview of what the course is all about..."
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      objectives: e.target.value,
                    })
                  }
                />
                <div className="coverPhoto">
                  <div className="coverText">
                    <p>
                      <b>Add Course Cover Photo </b>
                      <span>(Optional)</span>
                    </p>
                    <span>
                      (This is the picture that will display as the home cover
                      when your course is viewed)
                    </span>
                  </div>
                  <div className="coverCreate">
                    <InputBox
                      courseDetails={courseDetails}
                      setCourseDetails={setCourseDetails}
                    />
                  </div>
                </div>
              </div>
              <div className="outlinebtn">
                <button onClick={() => setActiveTab(1)}>Next</button>
              </div>
            </div>
          )}
          {activeTab === 0 && (
            <>
              <div className="outline-form">
                <h2>Price</h2>
                <div className="outlineCard-container">
                  <input
                    type="text"
                    placeholder="Course Price"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                    onChange={(e) =>
                      setCourseDetails({
                        ...courseDetails,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="outlinebtn2">
                <button onClick={createCourseRequest}>Submit</button>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="preview-course">
                <h2>{courseDetails.title}</h2>
                <div className="preview-text">
                  <p>COURSE OBJECTIVE</p>
                  <p>{courseDetails.objectives}</p>
                  <p>
                    <b>{courseDetails.outlines.materialTitle}</b>
                  </p>
                </div>
                {/* <MediaContent /> */}
              </div>
              <div className="outlinebtn2">
              <Link to="/Instructor-dashboard">
                  <button type="submit">Finish</button>
                </Link>
              </div>
            </>
          )}
        </div>
        <OverlayLoader showing={showing} />
      </div>
    </>
  );
};

export default OutlineCourse3;
