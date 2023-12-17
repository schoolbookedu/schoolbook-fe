import React, {useState} from "react";
import Audio from "./Audio";
import Video from "./Video";
import Document from "./Document";
import OutlineCardList from "../Outline Card/OutlineCardList";



const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Outlines" },
];

const CourseObjective = ({ objectives, materials }) => {
  const [activeTab, setActiveTab] = useState(0);

console.log(materials)

const materialComponent = (material) => {
  const { type, materialId } = material;
  if (type === "audio") {
    return <Audio audioUrl={""} audioId={materialId} />;
  } else if (type === "video") {
    return <Video videoUrl={""} videoId={materialId} />;
  } else if (type === "document") {
    return <Document documentUrl={""} documentId={materialId} />;
  } 
  else {
    return (
      <>
        This course does not have a material Url.  <br/><br/>MaterialId: {materialId}
      </>
    );
  }


};


return (
  <>
    <div className="objective">
      <div className="objective-container">
        <div className="objectiveTab">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 0 && (
          <div className="objective-content">
            <p>{objectives}</p>
          </div>
        )}
        {activeTab === 1 && (
          <div className="outlineCard-container">
            <div className="outlineCardList">
              {materials.map((material) => (
                <div key={material._id} className="mt-8">
                  {materialComponent(material)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
};
export default CourseObjective;

