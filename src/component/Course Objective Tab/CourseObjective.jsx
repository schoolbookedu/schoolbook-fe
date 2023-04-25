import { React, useState } from "react";
import { Link } from "react-router-dom";
import OutlineCard from "../Outline Card/OutlineCard";
import "./CourseObjective.css";
import { useSelector } from "react-redux";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Outlines" },
];

const cardData = [
  { id: 0, title: "Fundamentals Of Graphic Design ", text: "Course Outline 1" },
  { id: 1, title: "Elements Of Graphic Design", text: "Course Outline 2" },
  { id: 2, title: "Principles Of Graphic Design", text: "Course Outline 3" },
  { id: 3, title: "Tools Of Graphic Design", text: "Course Outline 4" },
  { id: 4, title: "Business Of Graphic Design", text: "Course Outline 5" },
  { id: 5, title: "Review", text: "Course Outline 6" },
];

const CourseObjective = () => {
  const [activeTab, setActiveTab] = useState(0);
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
             
                {cardData.map((card) => (
                  <Link to="/CourseContent" style={{textDecoration: 'none'}}>
                    <OutlineCard
                      key={card.id}
                      title={card.title}
                      text={card.text}
                    />
                  </Link>
                ))}
           
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseObjective;
