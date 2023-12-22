import React from 'react'

const Video = ({videoUrl}) => {
  return (
    <div>
      <video
        preload="auto"
        autoPlay
        loop
        muted
        src={videoUrl} type="video/mp4" />
   
    </div>
  )
}

export default Video