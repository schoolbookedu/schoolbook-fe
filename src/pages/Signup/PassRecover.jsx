import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import logo from "../../utils/logo.png";
import Tab from "../../component/Student/Tab";
import FPass from "../../component/ForgotPassword/FPass";

const PassRecover = () => {
  return (
    <div className="passrecover">
     <div className="signup">
      <div className="signup-container">
        <div className="tab">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <Tab />
          </div>
        </div>
        <div className="form">
          <FPass/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PassRecover;
