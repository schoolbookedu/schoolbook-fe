import { React, useState } from "react";
import { Link } from "react-router-dom";
import OutlineCard from "../Outline Card/OutlineCard";
import "./CourseObjective.css";

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                amet. Pellentesque commodo lacus at sodales sodales. Quisque
                sagittis orci ut diam condimentum,vel euismod erat placerat. In
                iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum
                dolor sit
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                amet. Pellentesque commodo lacus at sodales sodales. Quisque
                sagittis orci ut diam condimentum,vel euismod erat placerat. In
                iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum
                dolor sit
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
