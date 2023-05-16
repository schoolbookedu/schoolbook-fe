import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from '../../context/AuthProvider';
import axios from "../../api/axios";
import { Link, Navigate } from "react-router-dom";
import "./RegisterTab.css";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

const LOGIN_URL = 'api/v1/users/login'
const UNIVERSITY_URL = '/api/v1/universities'

const StudentLogin = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const { setAuth } = useContext(AuthContext);


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [universities, setUniversities] = useState([]);
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  
  const [errors, setErrors] = useState([]);


  const handleRegSubmit = async (event) => {
    event.preventDefault();
 
    try {
        const response = await axios.post("/api/v1/users", {
          fullName,
          email,
          phoneNumber,
          gender,
          universities,
          department,
          level,
          password,
          country
        });
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setErrors(error.response.data.errors);
      }
    }
  };




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

    }catch (err){
        if(!err?.response){
          setErrMsg('No server response')
        } else if(err.response?.status === 400){
          setErrMsg("Missing Username or Password");
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
            console.log(response.data.data)
            setUniversities( response.data.data.resource)  
          })
          .catch(error => {
            console.error("There are no university available at this time");
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
                <select id="university" value={universities} onChange={(e) => setUniversities(e.target.value)}>
                  {/* <option value="">University</option>
                  {universities.map(university => (
                     <option key={university.id} value={university.id}>{university.name}</option>
                  ))} */}
                  <option value="Convenant">Convenant</option>
                  <option value="Babcock">Babcock</option>
                  <option value="Bowen">Bowen</option>
                  <option value="Unilag">Unilag</option>
                </select>  
                <input
                  type="text"
                  placeholder="Department"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  />
                <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="Level">Level</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
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
            <section>
              <h1>You are logged in!</h1>
            </section>
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

export default StudentLogin

