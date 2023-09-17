import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './Create.css'
import {faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Create = () => {
  return (
    <div className='create'>
      <Link to="/course-outline">
        <FontAwesomeIcon icon={faPlusCircle} style={{color:"#407BFF", fontSize:"24px"}}/>
      </Link>
    </div>
  )
}

export default Create