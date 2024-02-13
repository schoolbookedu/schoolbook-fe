import { React } from "react";
import "./CourseOutline.css";
import banner from "../../utils/banner.png";

const CourseOuline1 = ({ title, materials }) => {
  return (
    <div className="flex gap-4">
      <h2 className="text-lg md:text-xl">{title}</h2>
      {materials.map((material, index) => (
        <div className="courseoutline" key={index}>
          {/* <div className="mediaaudio">
            <img src={banner} alt="audiobanner" />
          </div> */}
          <br />
          <div className="sidenavContent-title">
            <div className="sidenavContent-text">
              <div className="sidenavContent-titletext">
                {/* <h2>{material?.title}</h2> */}
              </div>
              {/* <div className="sidenavContent-subtitletext">
                <h2>
                  Introduction to Software Engineering
                  <span> Course Module 1</span>
                </h2>
              </div> */}
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
