import React, { useState } from "react";
import "./Tab.css";


const Tab = ({ activeTab, onTabChange }) => {
  return (
      <div className="Student">
        <div className="tabs">
          <button
        onClick={() => onTabChange('instructor')}
        className={activeTab === 'instructor' ? 'active' : ''}
      >
        Instructor
      </button>
      <button
        onClick={() => onTabChange('student')}
        className={activeTab === 'student' ? 'active' : ''}
      >
        Student
      </button>
        </div>
        <div className="tab-content">
          {activeTab === 'instructor' && <p>Strengthen <br/>Your Learning <br/><span>With Schoolbook</span></p>}
          {activeTab === 'student' && <p>Strengthen <br/>Your Learning <br/><span>With Schoolbook</span></p>}
        </div>
      </div>
  );
};

export default Tab;
