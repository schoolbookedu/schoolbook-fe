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

  const nextComponent = () => {
    switch (currentComponent) {
      case "OutlineCourse":
        setCurrentComponent("OutlineCourse2");
        break;
      case "OutlineCourse2":
        if (inputValue.trim() !== "") {
          setCards([...cards, inputValue]);
          setInputValue("");
        }
        setCurrentComponent("OutlineCourse3");
        break;
      case "OutlineCourse3":
        setCurrentComponent("OutlineCourse4");
        break;
      case "OutlineCourse4":
        if (materialValue.trim() !== "") {
          setMaterialCards([...materialCards, materialValue]);
          setMaterialValue("");
        }
        setCurrentComponent("OutlineCourse5");
        break;
      case "OutlineCourse5":
        setCurrentComponent("OutlineCourse6");
        break;
      default:
        break;
    }
  };

  const previousComponent = () => {
    switch (currentComponent) {
      case "OutlineCourse2":
        setCurrentComponent("OutlineCourse");
        break;
      case "OutlineCourse3":
        setCurrentComponent("OutlineCourse2");
        break;
      case "OutlineCourse4":
        setCurrentComponent("OutlineCourse3");
        break;
      case "OutlineCourse5":
        setCurrentComponent("OutlineCourse4");
        break;
      case "OutlineCourse6":
        setCurrentComponent("OutlineCourse5");
        break;
      default:
        break;
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "OutlineCourse":
        return <OutlineCourse onNext={nextComponent} cards={cards}/>;
      case "OutlineCourse2":
        return (
          <OutlineCourse2
            onNext={nextComponent}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "OutlineCourse3":
        return (
          <OutlineCourse3
            onNext={nextComponent}
            onPrevious={previousComponent}
            cards={cards}
          />
        );
      case "OutlineCourse4":
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
      case "OutlineCourse5":
        return (
          <OutlineCourse5
            onNext={nextComponent}
            onPrevious={previousComponent}
            materialCards={materialCards}
          />
        );
      case "OutlineCourse6":
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
      default:
        break;
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
                  <Created />
                  <Created />
                  <Created />
                </div>
                <div className="fcourse-scroll">
                  <Created />
                  <Created />
                  <Created />
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
