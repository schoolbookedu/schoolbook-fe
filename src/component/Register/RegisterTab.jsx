import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterTab.css";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

const RegisterTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
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
          {activeTab === 0 && 
              <form>
                <input type="text" placeholder="Firstname"></input>
                <input type="email" placeholder="Email"></input>
                <select id="Gender" name="Gender">
                  <option className="drop" value="Gender">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="text" placeholder="University"></input>
                <input type="text" placeholder="Department"></input>
                <select id="Level" name="Level">
                  <option value="Level">Level</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                </select>
                <input type="password" placeholder="Password"></input>
                <input type="text" placeholder="Country"></input>
                <div className="check">
                  <input type="checkbox" id="terms and conditions"/>
                  <label>By Registering you agree with the terms and<br/> condition of schoolbook</label> 
                </div> 
                <div className="formButton">
                <Link to="/InstructorDashboard">
                  <input type="submit" value="Register"></input> 
                  </Link>
                </div>                   
              </form>
          }
          {activeTab === 1 && 
          <form>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <div className="loginButton">
              <Link to="/Dashboard">
                <input type="submit" value="Login"></input> 
              </Link>
              <Link to="/PassRecover">Forgot&nbsp;password?</Link>
            </div>   
          </form>}
        </div>
      </div>
  )
}

export default RegisterTab

