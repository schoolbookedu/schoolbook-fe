// import { React, useState } from "react";
// import OutlineCard from "../Outline Card/OutlineCard";
// import "./CourseObjective.css";
// import { useSelector } from "react-redux";
// import OutlineCardList from "../Outline Card/OutlineCardList";

// const tabs = [
//   { id: 0, label: "Course Objectives" },
//   { id: 1, label: "Course Outlines" },
// ];

// const CourseObjective = ({ cards, objectives, materials }) => {
//   const [activeTab, setActiveTab] = useState(0);
//   // const [cards, setCards] = useState([
//   //   { id: 0, title: "Fundamentals Of Graphic Design ", text: "Course Outline 1" },
//   //   { id: 1, title: "Elements Of Graphic Design", text: "Course Outline 2" },
//   //   { id: 2, title: "Principles Of Graphic Design", text: "Course Outline 3" },
//   //   { id: 3, title: "Tools Of Graphic Design", text: "Course Outline 4" },
//   //   { id: 4, title: "Business Of Graphic Design", text: "Course Outline 5" },
//   //   { id: 5, title: "Review", text: "Course Outline 6" },
//   // ]);

//   // console.log(materials);
//   return (
//     <>
//       <div className="objective">
//         <div className="objective-container">
//           <div className="objectiveTab">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 className={activeTab === tab.id ? "active" : ""}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//           {activeTab === 0 && (
//             <div className="objective-content">
//               <p>{objectives}</p>
//             </div>
//           )}
//           {activeTab === 1 && (
//             <div className="outlineCard-container">
//               <div className="outlineCardList">
//                 {/* <OutlineCardList cards={cards} /> */}
//                 {materials.map((material) => (
//                   <p key={material._id} className="mt-8">{material.materialId}</p>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CourseObjective;



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

const materialComponent = (material) => {
  const { type, materialId } = material;

  if (type === "audio") {
    return <Audio audioUrl={""} audioId={materialId} />;
  } else if (type === "video") {
    return <Video videoUrl={""} videoId={materialId} />;
  } else if (type === "document") {
    return <Document documentUrl={""} documentId={materialId} />;
  } else {
    return (
      <>
        This course does not have a material Url.  <br/><br/>MaterialId: {materialId}
      </>
    );
  }

};

export default CourseObjective;