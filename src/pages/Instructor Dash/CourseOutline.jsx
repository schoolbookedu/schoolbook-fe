import React, { useState } from "react";
import Nav from "../../component/Navbar/Nav";
import Create from "../../component/Create Courses/Create";
import Created from "../../component/Featured Courses/Created";
import OutlineCourse from "../../component/Course Component/OutlineCourse";
import OutlineCourse2 from "../../component/Course Component/OutlineCourse2";
import OutlineCourse3 from "../../component/Course Component/OutlineCourse3";
import OutlineCourse5 from "../../component/Course Component/OutlineCourse5";
import OutlineCourse4 from "../../component/Course Component/OutlineCourse4";
import OutlineCourse6 from "../../component/Course Component/OutlineCourse6";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { OverlayLoader } from "../../loaders";

const tab = [
  { id: 1, label: "Home" },
  { id: 0, label: "Create Course" },
  { id: 2, label: "Course Created" },
];

const CourseOutline = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("OutlineCourse");
  const [inputValue, setInputValue] = useState("");
  const [materialValue, setMaterialValue] = useState("");
  const [cards, setCards] = useState([]);
  const [materialCards, setMaterialCards] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    objectives: "",
    thumbnail: "",
    price: "",
    outlines: {
      materialTitle: "",
      materialid: "",
    },
  });
  console.log({ courseDetails });

  const { getCourses } = queries;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  if (isLoading) {
    return <OverlayLoader showing={true} />;
  }
  console.log(data.data);

  const nextComponent = () => {
    if (currentComponent === "OutlineCourse") {
      setCurrentComponent("OutlineCourse2");
    } else if (currentComponent === "OutlineCourse2") {
      if (inputValue.trim() !== "") {
        setCards([...cards, inputValue]);
        setInputValue("");
      }
      setCurrentComponent("OutlineCourse3");
    } else if (currentComponent === "OutlineCourse3") {
      setCurrentComponent("OutlineCourse4");
    } else if (currentComponent === "OutlineCourse4") {
      if (materialValue.trim() !== "") {
        setMaterialCards([...materialCards, materialValue]);
        setMaterialValue("");
      }
      setCurrentComponent("OutlineCourse5");
    } else if (currentComponent === "OutlineCourse5") {
      setCurrentComponent("OutlineCourse6");
    }
  };

  const previousComponent = () => {
    if (currentComponent === "OutlineCourse2") {
      setCurrentComponent("OutlineCourse");
    } else if (currentComponent === "OutlineCourse3") {
      setCurrentComponent("OutlineCourse2");
    } else if (currentComponent === "OutlineCourse4") {
      setCurrentComponent("OutlineCourse3");
    } else if (currentComponent === "OutlineCourse5") {
      setCurrentComponent("OutlineCourse4");
    } else if (currentComponent === "OutlineCourse6") {
      setCurrentComponent("OutlineCourse5");
    }
  };

  const renderComponent = () => {
    if (currentComponent === "OutlineCourse") {
      return (
        <OutlineCourse
          onNext={nextComponent}
          cards={cards}
          setCourseDetails={setCourseDetails}
          courseDetails={courseDetails}
        />
      );
    } else if (currentComponent === "OutlineCourse2") {
      return (
        <OutlineCourse2
          onNext={nextComponent}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCourseDetails={setCourseDetails}
          courseDetails={courseDetails}
        />
      );
    } else if (currentComponent === "OutlineCourse3") {
      return (
        <OutlineCourse3
          onNext={nextComponent}
          onPrevious={previousComponent}
          cards={cards}
          setCourseDetails={setCourseDetails}
          courseDetails={courseDetails}
        />
      );
    } else if (currentComponent === "OutlineCourse4") {
      return (
        <OutlineCourse4
          onNext={nextComponent}
          onPrevious={previousComponent}
          materialValue={materialValue}
          isFileSelected={isFileSelected}
          setIsFileSelected={setIsFileSelected}
          setMaterialValue={setMaterialValue}
        />
      );
    } else if (currentComponent === "OutlineCourse5") {
      <OutlineCourse5
        onNext={nextComponent}
        onPrevious={previousComponent}
        materialCards={materialCards}
      />;
    } else if (currentComponent === "OutlineCourse6") {
      return (
        <OutlineCourse6
          onPrevious={previousComponent}
          materialValue={materialValue}
          setMaterialValue={setMaterialValue}
          isFileSelected={isFileSelected}
          materialCards={materialCards}
          setMaterialCards={setMaterialCards}
        />
      );
    }
  };

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
          {activeTab === 0 && (
            <div className="outline">{renderComponent()}</div>
          )}
          {activeTab === 1 && (
            <div className="content-container">
              <div className="create-container">
                <Create />
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="fcourse-container">
              <div className="instcourse-container">
                <div className="fcourse-scroll">
                  {data?.data?.resource?.length > 0 ? (
                    <>
                      {data.data.resource.map((resource) => (
                        <Created key={resource?.id} resource={resource} />
                      ))}
                    </>
                  ) : (
                    <>No items created</>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;
