import React from "react";
import ReactAudioPlayer from "react-audio-player";

const Audio = ({ audioUrl }) => {
  return (
    <div>
      <ReactAudioPlayer 
      src={audioUrl}
      autoPlay 
      controls 
      className="w-full"
      />
    </div>
  );
};

export default Audio;
