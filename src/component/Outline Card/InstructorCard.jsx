import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './OutlineCard.css'


const InstructorCard = ({ title, text, onDelete, onEdit }) => {
  return (
    <div className='outlineCard'>  
        <div className='red'>
          <FontAwesomeIcon icon={faEllipsisVertical} className="icon"/>
          <div className="dropdown-content">
            <div className='option'>
            <Link to="/InstructorOutline">
            <button onClick={onEdit}>Edit</button>
            </Link>
            <button onClick={onDelete}>Delete</button>
            </div>
          </div>
        </div>
        <span>{text}</span>
        <h2>{title}</h2>
    </div>
  )
}

export default InstructorCard