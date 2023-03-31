import React from 'react'
import './OutlineCard.css'


const OutlineCard = (props) => {
  return (
    <div className='outlineCard'>
        <span>{props.text}</span>
        <h2>{props.title}</h2>
    </div>
  )
}

export default OutlineCard