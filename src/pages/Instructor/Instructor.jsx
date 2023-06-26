import {React, useState} from "react";
import "../../component/Register/RegisterTab.css";
import Login from "../../component/Instructor/Login";
import Register from "../../component/Instructor/Register";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

const Instructor = () => {

    const [activeTab, setActiveTab] = useState('login')

    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };

    const Navigate = useNavigate();

  return (
    <div className="instructor-wrapper">
        <div className="instructor-design">
        <div className="tabs">
          <button
        onClick={() => handleTabChange('instructor')}
        className={activeTab === 'instructor' ? 'active' : ''}
      >
        Instructor
      </button>
      <button
        onClick={() => handleTabChange('student')}
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
        <div className="instructor-signup">
        <div className="register">
      <div className="tabForm">
        <div className="registerTab">
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
          <>
          onClick={() => handleTabChange('login')}
          className={activeTab === 'login' ? 'active' : ''}
          </>
        )}
        {activeTab === 1 && (
          <>
            onClick={() => handleTabChange('register')}
          className={activeTab === 'register' ? 'active' : ''}
          </>
        )}
      </div>
      {activeTab === 'login' ? <Login /> : <Register />}
    </div>
        </div>




    </div>
  );
};

export default Instructor;
