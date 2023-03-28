import React from 'react'
import { Link } from 'react-router-dom';
import "../Register/RegisterTab.css"
import "./FPass.css";

const FPasstwo = () => {
  return (
    <div className="register">
            <h2>Password Recovery</h2>
        <div className="tabForm">
          <form>
          <input type="password" placeholder="New Password"></input>
            <input type="password" placeholder="Re-Enter Password"></input>
          <div className="formButton">
            <Link to="/">
              <input type="submit" value="Continue"></input>  
            </Link> 
          </div>  
          </form>
           
        </div>
      </div>
  )
}

export default FPasstwo