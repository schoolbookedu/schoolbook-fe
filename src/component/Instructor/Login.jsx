import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "../Register/RegisterTab.css";

const LOGIN_URL = "api/v1/users/login";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const Navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

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
    <>
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
  );
};
export default Login;
