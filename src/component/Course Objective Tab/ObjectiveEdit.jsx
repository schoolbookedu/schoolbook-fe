import { React, useState} from "react";
import "./CourseObjective.css";
import { useSelector } from "react-redux";
import InstructorMedia from "../Media Content/InstructorMedia";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Outlines" },
];



  const ObjectiveEdit = ({setEditModule}) => {

  const [activeTab, setActiveTab] = useState(0);
  // const [editmodule, setEditModule] = useState(false);
  // const setCards = [
  //   { id: 0, title: "Fundamentals Of Graphic Design ", text: "Course Outline 1" },
  //   { id: 1, title: "Elements Of Graphic Design", text: "Course Outline 2" },
  //   { id: 2, title: "Principles Of Graphic Design", text: "Course Outline 3" },
  //   { id: 3, title: "Tools Of Graphic Design", text: "Course Outline 4" },
  //   { id: 4, title: "Business Of Graphic Design", text: "Course Outline 5" },
  //   { id: 5, title: "Review", text: "Course Outline 6" },
  // ];
  
  const inputObjective = useSelector((state) => state.inputObjective);
  const inputMaterial = useSelector((state) => state.inputMaterial);


  return (
    <>
      <div className="objective">
        <div className="objective-container">
          <div className="objectiveTab">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 0 && (
            <div className="objective-content">
              <p>
               {inputObjective}
              </p>
            </div>
          )}
          {activeTab === 1 && (
            <>
            <div className="outlineCard-container">
                <input type="text"  value={inputMaterial}/>
            </div>
             <InstructorMedia onEdit={setEditModule}/>
             </>
          )}
        </div>
      </div>
    </>
  );
};

export default ObjectiveEdit;
