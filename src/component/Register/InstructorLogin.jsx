import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from '../../context/AuthProvider';
import axios from "../../api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./RegisterTab.css";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

const LOGIN_URL = 'api/v1/users/login'
const REGISTER_URL = "/api/v1/users"
const UNIVERSITY_URL = '/api/v1/universities'
const DEPARTMENT_URL = '/api/v1/departments'

const InstructorLogin = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const Navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [universities, setUniversities] = useState([]);
  const [currentUniversities, setCurrentUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState([]);
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  
  const [errors, setErrors] = useState([]);


  //Register
  const handleRegSubmit = async (event) => {
    event.preventDefault();
 
    try {
        const response = await axios.post(REGISTER_URL, 
            JSON.stringify(
                {
                    fullName,
                    email,
                    phoneNumber,
                    gender,
                    universities,
                    departments,
                    password,
                    country
                  }
            ),
            {
                headers: {"Content-Type": "application/json" },
                withCredentials: false,
            });
            setSuccess(true);
            //clear state and controlled inputs
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setGender("");
            setUniversities("");
            setDepartments("");
            setPassword("");
            setCountry("");
    } catch (error) {
        if (!error?.response) {
            setErrMsg("No Server Response");
          } else if (error.response?.status === 409) {
            setErrMsg("Username Taken");
          } else {
            setErrMsg("Registration Failed");
          }
          errRef.current.focus();
    }
  };



  //Login 
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try{
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({email, password}),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: false,
        }
      );
      // Display accesstoken in the console
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data.accessToken;
      const userType = response?.data?.userType;
      setAuth({email, password, userType, accessToken});
      setEmail('');
      setPassword('');
      setSuccess(true);
      Navigate("InstructorDashboard");

    }catch (err){
        if(!err?.response){
          setErrMsg('No server response')
        } else if(err.response?.status === 400){
          setErrMsg("Invalid Username or Password");
        } else if (err.response?.status === 401){
          setErrMsg("Unauthorized");
          }else{
            setErrMsg("Login Failed");
          }
          errRef.current.focus();
        }
      }

      // Getting the universities from the enndpoint
      useEffect(() => {
        axios.get(UNIVERSITY_URL)
          .then(response => {
            const universitiesData = response.data.data.resource;
            setUniversities(universitiesData); 
          })
          .catch(error => {
            console.error('Error fetching API:', error);
          });
      }, []);


      // Getting the Department from the enndpoint
      useEffect(() => {
        axios.get(DEPARTMENT_URL)
          .then(response => {
            const departmentData = response.data.data.resource;
            setDepartments(departmentData); 
          })
          .catch(error => {
            console.error('Error fetching API:', error);
          });
      }, []);

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
              <form onSubmit={handleRegSubmit}>
                <input 
                type="text" 
                placeholder="Fullname"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />
                <input 
                 type="email" 
                 placeholder="Email"
                 id="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 />
                 <input 
                 type="text" 
                 placeholder="Phone number"
                 id="PhoneNumber"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 required
                 />
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option className="drop" value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select id="university"  onChange={(e) => setCurrentUniversities(e.target.value)}>
                <option value={currentUniversities}>Universities</option>
                  {universities.map(university => (
                     <option key={university._id} value={university._id}>{university.name}</option>
                  ))}
                </select>  
                <select id="department"  onChange={(e) => setCurrentDepartment(e.target.value)}>
                  <option value={currentDepartment}>Departments</option>
                  {departments.map(department => (
                     <option key={department._id} value={department._id}>{department.name}</option>
                  ))}
                </select>  
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  />
                <input
                  type="text"
                  placeholder="Country"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  />
                <div className="check">
                  <input type="checkbox" id="terms and conditions"/>
                  <label>By Registering you agree with the terms and<br/> condition of schoolbook</label> 
                </div> 
                {errors.map((error) => (
                  <div key={error.param}>{error.msg}</div>
                ))}
                <div className="formButton">
                {/* <Link to="/InstructorDashboard"> */}
                  <input type="submit" value="Register"></input> 
                  {/* </Link> */}
                </div>                   
              </form>
          }
          {activeTab === 1 && 
          <>
          {success ? (
             {handleSubmit}
          ):(
          <>
           <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
              />
            <div className="loginButton">
                <input type="submit" value="Login" />
              <Link to="/PassRecover">Forgot&nbsp;password?</Link>
            </div>   
          </form>
          </>
          )}
          </>}
        </div>
      </div>
  )
}

export default InstructorLogin

