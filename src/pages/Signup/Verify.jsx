import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios';
import logo from "../../utils/logo.png";
import './Signup.css'

const USER_URL = '/api/v1/users'

const Verify = () => {
  const [fullName, setFullName] = useState("");
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZDkzMDRmYmZjYmM1MDM0NDlmYzVkIn0sImlhdCI6MTY4Njk5OTgxMiwiZXhwIjoxNjg3NjA0NjEyfQ.hmPD6RkDhat6r4RmbBps4uMEXNQ5C0pKVg9IBKK73CM'

  const fetchUserData = async () => {
   
    try {
      const response = await axios.get(USER_URL, 
       {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      const { fullName } = response.data.data; // Assuming the response contains a 'fullName' field
      setFullName(fullName);
      console.log(fullName)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  

  return (
    <div className='verify'>
        <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
        <div className='verify-page'>
            <h2>SchoolBook Edu Limited</h2>
            <p>Dear {fullName}<br/>
                Thank you for choosing to use schoolbook ! We just need to verify your email address to finalize your registration process.<br/>
                Kindly check your email address for an email sent by us at schoolbook to verify your account, you'll gain full access to all the features and benefits of our platform.<br/>
                If you didn't initiate this registration, please disregard this email and rest assured that your information remains secure.<br/>
            </p>
        </div>
    </div>
  )
}

export default Verify