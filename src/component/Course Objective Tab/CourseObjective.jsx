import React, { useState } from "react";
import Audio from "./Audio";
import Video from "./Video";
import Document from "./Document";
import OutlineCardList from "../Outline Card/OutlineCardList";
import { mediaType } from "../../utils";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Outlines" },
];

const CourseObjective = ({ objectives, materials }) => {
  const [activeTab, setActiveTab] = useState(0);

  console.log(materials);
  const MaterialComponent = ({ material }) => {
    console.log({ material });
    const { type: materialType, title, mediaURL } = material?.materialId;
    console.log({ materialType, mediaURL, title });
    const type = materialType?.toString()?.toLowerCase();
    return type === mediaType.AUDIO?.toString()?.toLowerCase() ? (
      <Audio audioUrl={mediaURL} />
    ) : type === mediaType.VIDEO?.toString()?.toLowerCase() ? (
      <Video videoUrl={mediaURL} />
    ) : (
      <Document documentUrl={mediaURL} title={title} />
    );
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
              {!!materials?.length ? (
                <>
                  {materials?.map((material) => (
                    <div key={material.materialId} className="mt-8">
                      {<MaterialComponent material={material} />}
                    </div>
                  ))}
                </>
              ) : (
                <h2>You have no material </h2>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CourseObjective;
