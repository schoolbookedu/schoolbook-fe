import React from "react";
import "./CourseOutline.css";
import MediaContent from "../Media Content/MediaContent";
import { useSelector } from "react-redux";

const CourseOutline4 = () => {
  const inputTitle = useSelector((state) => state.inputTitle);
  const inputMaterial = useSelector((state) => state.inputMaterial);
  return (
    <div className="courseoutline">
      <div className="sidenavContent-title">
        <div className="sidenavContent-text">
          <div className="sidenavContent-titletext">
            <h2>Software Engineering</h2>
          </div>
          <div className="sidenavContent-subtitletext">
            <h2>
              Introduction to Software Engineering<span> Course Module 4</span>
            </h2>
          </div>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
        <div className="sidenavContentbtn">
          <button>Followed</button>
        </div>
      </div>
      <div className="mediadocument">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
          sodales. Quisque sagittis orci ut diam condimentum,vel euismod erat
          placerat. In iaculis arcu eros, eget tempus orci facilisis id.
        <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
          sodales. Quisque sagittis orci ut diam condimentum,vel euismod erat
          placerat. In iaculis arcu eros, eget tempus orci facilisis id.
          <br/><br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
          sodales. Quisque sagittis orci ut diam condimentum,vel euismod erat
          placerat. In iaculis arcu eros, eget tempus orci facilisis id.
        </p>
      </div>
    </div>
  );
};

export default CourseOutline4;
