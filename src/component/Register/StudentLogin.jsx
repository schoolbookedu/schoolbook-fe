import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./RegisterTab.css";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

const LOGIN_URL = "api/v1/users/login";
const REGISTER_URL = "/api/v1/users";
const UNIVERSITY_URL = "/api/v1/universities";
const DEPARTMENT_URL = "/api/v1/departments";

const StudentLogin = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const Navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    userType: "",
    university,
    department,
    level: "",
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
        Navigate("/Verify");
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  //Login
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      // Display accesstoken in the console
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data.accessToken;
      const userType = response?.data?.userType;
      setAuth({ email, password, userType, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
      Navigate("/InstructorDashboard");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

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
        {activeTab === 0 && (
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
            <input
              type="text"
              placeholder="User Type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
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
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option className="drop" value="">
                Level
              </option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
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
        )}
        {activeTab === 1 && (
          <>
            {success ? (
              { handleSubmit }
            ) : (
              <>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    autoComplete="current-password"
                  />
                  <div className="loginButton">
                    <input type="submit" value="Login" />
                    <Link to="/PassRecover">Forgot&nbsp;password?</Link>
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
