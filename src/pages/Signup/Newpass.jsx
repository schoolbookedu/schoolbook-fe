import {React, useState} from "react";
import "./Signup.css";
import logo from "../../utils/logo.png";
import Tab from "../../component/Student/Tab";
import FPasstwo from "../../component/ForgotPassword/FPasstwo";

const Newpass = () => {
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
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <Tab activeTab={activeTab} onTabChange={handleTabChange}/>
          </div>
        </div>
        <div className="form">
          <FPasstwo />
        </div>
      </div>
    </div>
  );
};

export default Newpass;
