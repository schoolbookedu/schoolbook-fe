import React from 'react'
import './Signup.css'
import logo from '../../utils/logo.png'
import Tab from '../../component/Student/Tab';
import FPass from '../../component/ForgotPassword/FPass';

const PassRecover = () => {
  return (
    <div className='signup'>  
          <div className='tab'>
           <div className='container'>
           <div className='logo'>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
            </div>
            <Tab/>
           </div>
        </div>
        <div className='form'>
            <FPass/>
        </div>
    </div>
  )
}

export default PassRecover