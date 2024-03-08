import React from "react";
import ReactPlayer from "react-player";

const Video = ({ videoUrl }) => {
  return (
   
    <div>
       {/* <h2>{title}</h2> */}
      <ReactPlayer
        className="react-player"
        controls="true"
        playing
        url={videoUrl}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Video;
