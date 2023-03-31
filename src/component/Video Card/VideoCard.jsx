import React from 'react'
import './VideoCard.css'

const VideoCard = (props) => {
  return (
    <div className='videoCard'>
        {props.icon}
        <p>{props.title}</p>
    </div>
  )
}

export default VideoCard