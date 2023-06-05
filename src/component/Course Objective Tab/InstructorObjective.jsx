import { React, useState } from "react";
import InstructorCard from "../Outline Card/InstructorCard";
import "./CourseObjective.css";
import { useSelector } from "react-redux";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Outlines" },
];



const InstructorObjective = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [courseCards, setcourseCards] = useState([
    // { id: 0, title: "Fundamentals Of Graphic Design ", text: "Course Outline 1" },
    // { id: 1, title: "Elements Of Graphic Design", text: "Course Outline 2" },
    // { id: 2, title: "Principles Of Graphic Design", text: "Course Outline 3" },
    // { id: 3, title: "Tools Of Graphic Design", text: "Course Outline 4" },
    // { id: 4, title: "Business Of Graphic Design", text: "Course Outline 5" },
    // { id: 5, title: "Review", text: "Course Outline 6" },
  ]);
  
  const handleDelete = (id) => {
    setcourseCards(courseCards.filter((card) => card.id !== id));
  };
  
  const handleEdit = (id) => {
    console.log(`Editing card with id: ${id}`);
  };

  const inputObjective = useSelector((state) => state.inputObjective);
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
            <div className="outlineCard-container">
                {courseCards.map((card) => (
                    <InstructorCard
                      key={card.id}
                      title={card.title}
                      text={card.text}
                      onDelete={() => handleDelete(card.id)}
                      onEdit={() => handleEdit(card.id)}
                    />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorObjective;
