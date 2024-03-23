import { React } from "react";
import "../Course Component/CourseOutline.css";
import { mediaType } from "../../utils";
import Video from "../Course Objective Tab/Video";
import Document from "../Course Objective Tab/Document";
import Audio from "../Course Objective Tab/Audio";

const CourseModuelMaterial = ({ title, materials }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {!!materials?.length &&
        materials.map((material, index) => (
          <DisplayMaterial
            key={module?._id + index}
            material={material}
            mediaType={mediaType}
            index={index}
            title={title}
          />
        ))}
    </div>
  );
};

export default CourseModuelMaterial;

const DisplayMaterial = ({ material, mediaType, index, title }) => {
  return (
    <div className="courseoutline" key={index}>
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
              {title}
              <span className="text-[.6rem]"> Course Module {index + 1}</span>
            </h2>
          </div>
          {/* <span>Tutor: Prof John Tobiloba</span> */}
        </div>
        {/* <div className="sidenavContentbtn">
              <button>Followed</button>
            </div> */}
      </div>
    </div>
  );
};
