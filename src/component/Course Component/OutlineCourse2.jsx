import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useRef } from "react";
import { faFile, faMusic, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import InputBox from "../Create Courses/InputBox";
import { mediaType } from "../../utils";
import { showToast } from "../notifications";
import { mutations } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useOverlayLoader } from "../../hooks";

const link = [
  { id: 0, list: "Course Intro" },
  { id: 1, list: "Course Module" },
  { id: 2, list: "Course Preview" },
];
const OutlineCourse2 = ({
  onNext,
  onPrevious,
  inputValue,
  setInputValue,
  courseDetails,
  setCourseDetails,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const [selectedFileName, setSelectedFileName] = useState("");

  const { createCourse, createMaterial } = mutations;
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

  const handleClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];

    if (fileObj) {
      let materialType;

      // Check the file type and set materialType accordingly
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
        // Handle the case where an invalid file type is selected
        console.log(
          "Invalid file type. Please select an audio, video, or document file."
        );
        // Optionally, you can provide feedback to the user
        return;
      }
      console.log({ materialType });
      const reader = new FileReader();

      reader.onload = () => {
        setCourseDetails({
          ...courseDetails,
          outlines: {
            materialId: reader.result, // This will contain the base64 data
            materialTitle: courseDetails?.outlines?.materialTitle,
            materialType: materialType,
          },
        });
      };

      reader.readAsDataURL(fileObj); // This reads the file as a data URL
      setSelectedFileName(fileObj.name);
    }
  };

  const createCourseRequest = async () => {
    console.log({ courseDetails });
 
    const materialOutlines = courseDetails?.outlines;
    if (materialOutlines?.materialId) {
      const fileType = materialOutlines?.materialType;
      console.log(fileType)
      const formData = new FormData()
      formData.append("title",materialOutlines.materialTitle)
      formData.append('mediaURL', materialOutlines.materialId)
      formData.append ('type',fileType)
    
     // formData.append('type', 
      //getFileType (materialOutlines?.materialId))
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
          {activeTab === 0 && (
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
          {activeTab === 1 && (
            <>
              <div className="outline-form">
                <label>Course Module Title</label>
                <input
                  type="text"
                  placeholder="e.g Introduction to Programming"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      outlines: { materialTitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="outline-form">
                <h2>Course Module Materials</h2>
                <div className="modulebtn">
                  <button>Add Materials</button>
                  {selectedFileName && <span style={{fontSize: "12px", textAlign: "center"}}>{selectedFileName}</span>}
                  <div className="modulehover">
                    <ul>
                      <li onClick={() => handleClick(videoInputRef)}>
                        <FontAwesomeIcon icon={faVideo} />
                        <br />
                        <span>Add Video</span>
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
                        <span>Add Audio</span>
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
                        <span>Add Document</span>
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
              <div className="outlinebtn2">
                {/* <button className="prev" onClick={onPrevious}>
                  Previous
                </button>
                <button onClick={onNext}>Next</button> */}
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
      </div>
    </>
  );
};

export default OutlineCourse2;
