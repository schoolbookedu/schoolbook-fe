import React from 'react'
import { Link } from 'react-router-dom'
import './OutlineCard.css'


const OutlineCard = ({text, title}) => {
  return (
    <Link to="/CourseContent" 
    style={{ textDecoration: "none" }}>
    <div className='outlineCard'>
        <span>{text}</span>
        <h2>{title}</h2>
    </div>
    </Link>
  )
}

export default OutlineCard