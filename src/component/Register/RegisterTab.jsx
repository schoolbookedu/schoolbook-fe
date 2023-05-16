import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from '../../context/AuthProvider';
import axios from "../../api/axios";
import { Link, Navigate } from "react-router-dom";
import "./RegisterTab.css";
import InstructorLogin from "./InstructorLogin";
import StudentLogin from "./StudentLogin";

const RegisterTab = ({activeTab}) => {
  

  return (
         <div className="register">     
          {activeTab === 'instructor' && <InstructorLogin />}
          {activeTab === 'student' && <StudentLogin />}
      </div>
  )
}

export default RegisterTab

