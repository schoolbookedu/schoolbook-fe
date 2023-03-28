import React, { useState } from "react";
import "./Tab.css";

const tabs = [
  { id: 0, label: "Instructor" },
  { id: 1, label: "Student" },
];

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
      <div className="Student">
        <div className="tabs">
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
        <div className="tab-content">
          {activeTab === 0 && <p>Strengthen <br/>Your Learning <br/><span>With Schoolbook</span></p>}
          {activeTab === 1 && <p>Strengthen <br/>Your Learning <br/><span>With Schoolbook</span></p>}
        </div>
      </div>
  );
};

export default Tab;
