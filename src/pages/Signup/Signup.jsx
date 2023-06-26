import {React, useState} from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import logo from "../../utils/logo.png";
import Tab from "../../component/Student/Tab";
import InstructorLogin from "../../component/Register/InstructorLogin";
import StudentLogin from "../../component/Register/StudentLogin";

const Signup = () => {
  const [activeTab, setActiveTab] = useState('instructor');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="tab">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <Tab activeTab={activeTab} onTabChange={handleTabChange}/>
          </div>
        </div>
        <div className="form">
        {activeTab === 'instructor' && <InstructorLogin />}
          {activeTab === 'student' && <StudentLogin />}
        </div>
      </div>
    </div>
  );
};

export default Signup;
