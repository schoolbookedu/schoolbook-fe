import React, { useState } from "react";
import Nav from "../../component/Navbar/Nav";
import Create from "../../component/Create Courses/Create";
import Created from "../../component/Featured Courses/Created";
// import OutlineCourse from "../../component/Course Component/OutlineCourse";
// import OutlineCourse1 from "../../component/Course Component/OutlineCourse1";
// import OutlineCourse2 from "../../component/Course Component/OutlineCourse2";
// import OutlineCourse3 from "../../component/Course Component/OutlineCourse3";
// import OutlineCourse5 from "../../component/Course Component/OutlineCourse5";
// import OutlineCourse4 from "../../component/Course Component/OutlineCourse4";
// import OutlineCourse6 from "../../component/Course Component/OutlineCourse6";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { OverlayLoader } from "../../loaders";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "../../component/EmptyMessage";
import { CreateCourseElem } from "../../component/Courses/createCourse";
// import InputBox from "../../component/Create Courses/InputBox";
// import InputBox from "../Create Courses/InputBox";

const tab = [
  { id: 1, label: "Home" },
  { id: 0, label: "Create Course" },
  { id: 2, label: "Course Created" },
];

const CourseOutline = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  // const [currentComponent, setCurrentComponent] = useState("OutlineCourse");
  // const [inputValue, setInputValue] = useState("");
  // const [materialValue, setMaterialValue] = useState("");
  // const [cards, setCards] = useState([]);
  // const [materialCards, setMaterialCards] = useState([]);
  // const [isFileSelected, setIsFileSelected] = useState(false);
  const [courseDetails] = useState({
    title: "",
    objectives: "",
    thumbnail: "",
    price: "",
    courseCode: "",
    outlines: {
      materialTitle: "",
      materialId: "",
      materialType: "",
    },
  });
  console.log({ courseDetails });

  const { getTutorCourses } = queries;
  const { data, isLoading} = useQuery({
    queryKey: ["courses"],
    queryFn: getTutorCourses,
  });
  if (isLoading) {
    return <OverlayLoader showing={true} />;
  }
  console.log(data.data);

  const viewCourse = (courseId) => {
    navigate(`/course-materials/${courseId}`);
  };

  // const nextComponent = () => {
  //   if (currentComponent === "OutlineCourse") {
  //     setCurrentComponent("OutlineCourse2");
  //   } else if (currentComponent === "OutlineCourse2") {
  //     if (inputValue.trim() !== "") {
  //       setCards([...cards, inputValue]);
  //       setInputValue("");
  //     }
  //     setCurrentComponent("OutlineCourse3");
  //   } else if (currentComponent === "OutlineCourse3") {
  //     setCurrentComponent("OutlineCourse4");
  //   } else if (currentComponent === "OutlineCourse4") {
  //     if (materialValue.trim() !== "") {
  //       setMaterialCards([...materialCards, materialValue]);
  //       setMaterialValue("");
  //     }
  //     setCurrentComponent("OutlineCourse5");
  //   } else if (currentComponent === "OutlineCourse5") {
  //     setCurrentComponent("OutlineCourse6");
  //   }
  // };

  // const previousComponent = () => {
  //   if (currentComponent === "OutlineCourse2") {
  //     setCurrentComponent("OutlineCourse");
  //   } else if (currentComponent === "OutlineCourse3") {
  //     setCurrentComponent("OutlineCourse2");
  //   } else if (currentComponent === "OutlineCourse4") {
  //     setCurrentComponent("OutlineCourse3");
  //   } else if (currentComponent === "OutlineCourse5") {
  //     setCurrentComponent("OutlineCourse4");
  //   } else if (currentComponent === "OutlineCourse6") {
  //     setCurrentComponent("OutlineCourse5");
  //   }
  // };

  // const renderComponent = () => {
  //   if (currentComponent === "OutlineCourse") {
  //     return (
  //       <OutlineCourse
  //         onNext={nextComponent}
  //         cards={cards}
  //         setCourseDetails={setCourseDetails}
  //         courseDetails={courseDetails}
  //       />
  //     );
  //   } else if (currentComponent === "OutlineCourse1") {
  //     return (
  //       <OutlineCourse1
  //         onNext={nextComponent}
  //         inputValue={inputValue}
  //         setInputValue={setInputValue}
  //         setCourseDetails={setCourseDetails}
  //         courseDetails={courseDetails}
  //       />
  //     );
  //      } else if (currentComponent === "OutlineCourse2") {
  //     return (
  //       <OutlineCourse2
  //         onNext={nextComponent}
  //         inputValue={inputValue}
  //         setInputValue={setInputValue}
  //         setCourseDetails={setCourseDetails}
  //         courseDetails={courseDetails}
  //       />
  //     );
  //   } else if (currentComponent === "OutlineCourse3") {
  //     return (
  //       <OutlineCourse3
  //         onNext={nextComponent}
  //         onPrevious={previousComponent}
  //         cards={cards}
  //         setCourseDetails={setCourseDetails}
  //         courseDetails={courseDetails}
  //       />
  //     );
  //   } else if (currentComponent === "OutlineCourse4") {
  //     return (
  //       <OutlineCourse4
  //         onNext={nextComponent}
  //         onPrevious={previousComponent}
  //         materialValue={materialValue}
  //         isFileSelected={isFileSelected}
  //         setIsFileSelected={setIsFileSelected}
  //         setMaterialValue={setMaterialValue}
  //       />
  //     );
  //   } else if (currentComponent === "OutlineCourse5") {
  //     <OutlineCourse5
  //       onNext={nextComponent}
  //       onPrevious={previousComponent}
  //       materialCards={materialCards}
  //     />;
  //   } else if (currentComponent === "OutlineCourse6") {
  //     return (
  //       <OutlineCourse6
  //         onPrevious={previousComponent}
  //         materialValue={materialValue}
  //         setMaterialValue={setMaterialValue}
  //         isFileSelected={isFileSelected}
  //         materialCards={materialCards}
  //         setMaterialCards={setMaterialCards}
  //       />
  //     );
  //   }
  // };

  return (
    <div>
      <Nav />
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-tab">
            {tab.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="dashboard-content">
          {activeTab === 0 && <CreateCourseElem setActiveTab={setActiveTab} />}
          {activeTab === 1 && (
            <div className="content-container">
              <div className="create-container">
                <Create />
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex flex-col mt-[100px]">
              <div className="flex justify-between align-center">
                <h2>Created Course</h2>
                <button onClick={() => setActiveTab(0)}>Create Course</button>
              </div>
              <div className="fcourse-container">
                {data?.data?.resource?.length > 0 ? (
                  <div className="fcourse-container-grid ">
                    {data.data.resource.map((resource) => (
                      <div
                        key={resource?._id}
                        className="created-course"
                        onClick={() => viewCourse(resource?._id)}
                      >
                        <Created resource={resource} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <EmptyMessage content="You have not created a course yet" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;
