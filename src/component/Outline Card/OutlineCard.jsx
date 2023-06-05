import React from 'react'
import { Link } from 'react-router-dom'
import './OutlineCard.css'


const OutlineCard = ({ index, text }) => {
  return (
    <Link to="/CourseContent" 
    style={{ textDecoration: "none" }}>
    <div className='outlineCard'>
        <span>Module {index}</span>
        <h2>{text}</h2>
    </div>
    </Link>
  )
}

export default OutlineCard