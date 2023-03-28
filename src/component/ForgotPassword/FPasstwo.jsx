import React from 'react'
import "../Register/RegisterTab.css"
import "./FPass.css";

const FPasstwo = () => {
  return (
    <div>
        <div className="register">
            <h2>Password Recovery</h2>
        <div className="tabForm">
          <form>
            <input type="password" placeholder="New Password"></input>
            <input type="password" placeholder="Re-Enter Password"></input>
            <div className="formButton">
              <a href='/'>
                <input type="submit" value="Continue"></input>
              </a> 
            </div> 
          </form> 
        </div>
      </div>
    </div>
  )
}

export default FPasstwo