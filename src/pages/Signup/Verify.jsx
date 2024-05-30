import { React } from "react";
import { Link } from "react-router-dom";
import logo from "../../utils/logo.png";
import "./Signup.css";

const Verify = () => {
  return (
    <div className="verify">
      <div className="logo-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="verify-page">
        <h2> 📩 Verify Your Registration in Your Email! 📩</h2>
        <br />
        <p>
          To complete your registration, please check your email for a
          verification message from us. <br />
          Simply follow the instructions provided to verify your account and
          gain full access.
        </p>
        <br />
        <p>
          <strong>Thank you for joining us</strong>
        </p>
        <br />
        <p>
          Click to go back to
          <Link
            to="/"
            className="mt-4 text-blue-500 font-bold py-4 px-5 rounded underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Verify;
