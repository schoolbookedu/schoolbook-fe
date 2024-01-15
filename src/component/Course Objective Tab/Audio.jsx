import React from "react";
import ReactAudioPlayer from "react-audio-player";

const Audio = ({ audioUrl }) => {
  return (
    <div>
      <ReactAudioPlayer
        src={audioUrl}
        autoPlay
        controls
        className="w-full md:w-[50%]"
      />
    </div>
  );
};

export default Audio;
