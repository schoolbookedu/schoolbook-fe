import React from "react";
import { Link } from "react-router-dom";
import "../Register/RegisterTab.css"
import "./FPass.css";


const FPass = () => {

  return (
         <div className="register">
            <h2>Password Recovery</h2>
            <p>Enter Code Sent to your Email</p>
        <div className="tabForm">
          <form>
          <input type="email" placeholder="Email"></input>
          <div className="formButton">
            <Link to="/Newpass">
              <input type="submit" value="Continue"></input>  
            </Link> 
          </div>  
          </form>
           
        </div>
      </div>
  )
}

export default FPass

