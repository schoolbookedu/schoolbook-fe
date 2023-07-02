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
        {/* className="w-full pt-[80px] bg-red-800" */}
        <div className="tab-content" >
          {activeTab === 'instructor' && <p className="text-[40px] text-[#fff] leading-normal font-bold ">Strengthen <br/>Your Learning <br/><span className="text-[#FEEF51]">With Schoolbook</span></p>}
          {activeTab === 'student' && <p>Strengthen <br/>Your Learning <br/><span>With Schoolbook</span></p>}
        </div>
      </div>
  );
};

export default Tab;
