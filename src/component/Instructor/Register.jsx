import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "../Register/RegisterTab.css";


const REGISTER_URL = "/api/v1/users";
const UNIVERSITY_URL = "/api/v1/universities";
const DEPARTMENT_URL = "/api/v1/departments";

const Instructor = () => {
  const Navigate = useNavigate();
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    userType: "Instructor",
    university,
    department,
    password: "",
    country: "",
    subscribe: "",
  });

  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);

  //Fetch universities data from the API endpoint
  const fetchUniversityData = async () => {
    axios
      .get(UNIVERSITY_URL)
      .then((response) => {
        setUniversities(response.data.data.resource);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
      });
  };
  useEffect(() => {
    fetchUniversityData();
  }, []);

  // Getting the Department from the endpoint
  const fetchDepartmentData = async () => {
    axios
      .get(DEPARTMENT_URL)
      .then((response) => {
        const departmentData = response.data.data.resource;
        setDepartments(departmentData);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  };
  useEffect(() => {
    fetchDepartmentData();
  }, []);

  //Signup
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      university:
        e.target.name === "universities" ? e.target.value : formData.university,
      department:
        e.target.name === "departments" ? e.target.value : formData.department,
    });
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      university: university,
      department: department,
    };
    axios
      .post(REGISTER_URL, updatedFormData)
      .then((response) => {
        console.log(response.data); 
        Navigate("/verify");
      })
      .catch((error) => {
        console.error(error); 
      });
  };



  return (
    <>
          <form onSubmit={handleRegSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Fullname"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option className="drop" value="">
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="university"
              value={university}
              onChange={(event) => setUniversity(event.target.value)}
            >
              <option>Select University</option>
              {universities.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              name="department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option>Select Department</option>
              {departments.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            <div className="check">
              <input
                type="checkbox"
                name="subscribe"
                value={formData.subscribe}
                onChange={handleChange}
              />
              <label>
                By Registering you agree with the terms and conditions of
                schoolbook
              </label>
            </div>
            <div className="formButton">
              <input type="submit" value="Register" />
            </div>
          </form>
  </>
)};

export default Instructor;
