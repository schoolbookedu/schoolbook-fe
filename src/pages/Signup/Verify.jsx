import { React } from "react";
import { Link } from "react-router-dom";
import logo from "../../utils/logo.png";
import "./Signup.css";

const Verify = () => {
  return (
    <div className="verify">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="verify-page">
        <h2>SchoolBook Edu Limited</h2>
        <p>
          Dear
          <br />
          Thank you for choosing to use schoolbook! We just need to verify your
          email address to finalize your registration process.
          <br />
          Kindly check your email address for an email sent by us at schoolbook
          to verify your account, you'll gain full access to all the features
          and benefits of our platform.
          <br />
          If you didn't initiate this registration, please disregard this email
          and rest assured that your information remains secure.
          <br />
        </p>
      </div>
    </div>
  );
};

export default Verify;
