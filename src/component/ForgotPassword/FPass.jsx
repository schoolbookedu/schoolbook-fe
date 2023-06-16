import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../Register/RegisterTab.css";
import axios from "../../api/axios";
import "./FPass.css";


  const FORGOT_PASSWORD = '/api/v1/users'

  const FPass = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to request password reset
      const response = await axios.post(FORGOT_PASSWORD, {
        email: email,
      });

      // Display success message
      setSuccessMessage(response.data.message);
      setErrorMessage("Invalid Email");
    } catch (error) {
      // Display error message
      setErrorMessage(error.response.data.message);
      setSuccessMessage("Kindly Check your Email for your new password");
    }
  };

  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <p>Enter Code Sent to your Email</p>
      <div className="tabForm">
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="formButton">
            <input type="submit" value="Continue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FPass;
