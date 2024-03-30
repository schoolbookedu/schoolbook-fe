import { React } from "react";
import "../Course Component/CourseOutline.css";
import Video from "../Course Objective Tab/Video";
import Document from "../Course Objective Tab/Document";
import Audio from "../Course Objective Tab/Audio";
import { mediaType } from "../../utils";

const CourseModuelMaterial = ({ title, material }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="courseoutline">
        <div className="mediaaudio">
          {mediaType.VIDEO === material?.type ? (
            <Video
              videoUrl={material?.mediaURL}
              title={material?.title ?? "Untitled Video"}
            />
          ) : mediaType.AUDIO === material?.type ? (
            <Audio
              audioUrl={material?.mediaURL}
              title={material?.title ?? "Untitled Audio"}
            />
          ) : (
            <Document
              documentUrl={material?.mediaURL}
              title={material?.title ?? "Untitled Document"}
            />
          )}
        </div>
        <br />
        <div className="sidenavContent-title">
          <div className="sidenavContent-text">
            {/* <div className="sidenavContent-titletext">
                  <h2>{material?.title}</h2>
                </div> */}
            <div className="sidenavContent-subtitletext">
              <h2>
                {/* {title} */}
                {/* <span className="text-[.6rem]"> Course Module {index + 1}</span> */}
              </h2>
            </div>
            {/* <span>Tutor: Prof John Tobiloba</span> */}
          </div>
          {/* <div className="sidenavContentbtn">
              <button>Followed</button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default CourseModuelMaterial;
