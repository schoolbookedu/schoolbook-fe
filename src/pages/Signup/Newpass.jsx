import React from 'react'
import './Signup.css'
import logo from '../../utils/logo.png'
import Tab from '../../component/Student/Tab';
import FPasstwo from '../../component/ForgotPassword/FPasstwo';

const Newpass = () => {
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
            <FPasstwo/>
        </div>
    </div>
  )
}

export default Newpass