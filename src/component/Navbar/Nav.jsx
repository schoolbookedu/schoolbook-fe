import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../utils/logo.png'
import './Nav.css';

const Nav = () => {
  return (
    <div className='nav'>
        <div className='nav-container'>
            <div className='nav-logo'>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <Link to="/Profile" style={{textDecoration:'none'}}>
            <div className='user'>
                <span className='userprofile'>AO</span>
                <p>Oluwaseyi</p>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Nav