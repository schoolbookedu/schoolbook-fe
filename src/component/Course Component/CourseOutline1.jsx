import { React } from "react";
import "./CourseOutline.css";
import banner from "../../utils/banner.png";

import { useQuery } from "@tanstack/react-query";
import { mediaType } from "../../utils";
import Video from "../Course Objective Tab/Video";
import Document from "../Course Objective Tab/Document";
import Audio from "../Course Objective Tab/Audio";
import { queries } from "../../api";

const CourseOuline1 = ({ title,  moduleId}) => {
  const { getCourseModulesMaterials } = queries;
  const moduleMaterialQuery = useQuery({
    queryKey: ["courseModuleMaterial"],
    queryFn: () => getCourseModulesMaterials(moduleId),
  });

  if (moduleMaterialQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  if (moduleMaterialQuery?.isError) {
    console.log(moduleMaterialQuery.error);
    return <>An error occurred while fetching material</>;
  }

  const materials = moduleMaterialQuery?.data?.data?.resource?.materials;
  return (
    <div className="flex gap-4">
      <h2 className="text-lg md:text-xl">{title}</h2>
      {materials.map((material, index) => (
        <div className="courseoutline" key={index}>
          <div className="mediaaudio">
            {mediaType.VIDEO === material?.type ? <Video videoUrl={material?.mediaURL}/> : mediaType.AUDIO === material?.type ? <Audio audioUrl={material?.mediaURL}/> : <Document documentUrl={material?.mediaURL}/>}
          </div>
          <br />
          <div className="sidenavContent-title">
            <div className="sidenavContent-text">
              <div className="sidenavContent-titletext">
                <h2>{material?.title}</h2>
              </div>
              <div className="sidenavContent-subtitletext">
                <h2>
                  {title}
                  <span> Course Module {index + 1}</span>
                </h2>
              </div>
              {/* <span>Tutor: Prof John Tobiloba</span> */}
            </div>
            {/* <div className="sidenavContentbtn">
              <button>Followed</button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseOuline1;
