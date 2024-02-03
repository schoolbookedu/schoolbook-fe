// import React, { useState } from "react";
// import Audio from "./Audio";
// import Video from "./Video";
// import Document from "./Document";
// import OutlineCardList from "../Outline Card/OutlineCardList";
// import { mediaType } from "../../utils";
// import { useSelector } from "react-redux";
// import { selectUI } from "../../store/inputSlice";
// import OutlineCard from "../Outline Card/OutlineCard";
// import MaterialCard from "../Outline Card/MaterialCard";
// import MaterialCardList from "../Outline Card/MaterialCardList";

// const tabs = [
//   { id: 0, label: "Course Objectives" },
//   { id: 1, label: "Course Modules" },
// ];

// const CourseObjective = ({ materials, edit, handleObjectiveChange }) => {
//   const [activeTab, setActiveTab] = useState(0);
//   const { objectives } = useSelector(selectUI);

//   console.log(materials);
//   const MaterialComponent = ({ material }) => {
//     console.log({ material });
//     const { type: materialType, title, mediaURL } = material?.materialId;
//     console.log({ materialType, mediaURL, title });
//     const type = materialType?.toString()?.toLowerCase();
//     return type === mediaType.AUDIO?.toString()?.toLowerCase() ? (
//       <Audio audioUrl={mediaURL} />
//     ) : type === mediaType.VIDEO?.toString()?.toLowerCase() ? (
//       <Video videoUrl={mediaURL} />
//     ) : (
//       <Document documentUrl={mediaURL} title={title} />
//     );
//   };

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
//               {/* <input type="text" value={edit ? "true":objectives} readOnly={edit} /> */}
//               <input
//                 type="text"
//                 value={objectives}
//                 onChange={handleObjectiveChange}
//                 readOnly={edit}
//               />
//             </div>
//           )}
//           {activeTab === 1 && (
//             <div className="flex flex-col mt-[100px]">
//               <div className="flex justify-end">
//                 <button onClick="">Add Modules</button>
//               </div>
//               <div className="outlineCard-container mt-4">
//                 <div className="fcourse-container-grid ">
//                   <OutlineCard />
//                   <OutlineCard />
//                   <OutlineCard />
//                   <OutlineCard />
//                   <OutlineCard />
//                   <OutlineCard />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default CourseObjective;

import React, { useState } from "react";
import Audio from "./Audio";
import Video from "./Video";
import Document from "./Document";
import OutlineCardList from "../Outline Card/OutlineCardList";
import { mediaType } from "../../utils";
import { useSelector } from "react-redux";
import { selectUI } from "../../store/inputSlice";
import OutlineCard from "../Outline Card/OutlineCard";
import MaterialCard from "../Outline Card/MaterialCard";
import MaterialCardList from "../Outline Card/MaterialCardList";
import EditModal from "../Modals/EditModal";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Modules" },
];

const CourseObjective = ({ materials, edit, handleObjectiveChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { objectives } = useSelector(selectUI);
  const [uploadedModules, setUploadedModules] = useState([]);

  const MaterialComponent = ({ material }) => {
    const { type: materialType, title, mediaURL } = material?.materialId;
    const type = materialType?.toString()?.toLowerCase();
    return type === mediaType.AUDIO?.toString()?.toLowerCase() ? (
      <Audio audioUrl={mediaURL} />
    ) : type === mediaType.VIDEO?.toString()?.toLowerCase() ? (
      <Video videoUrl={mediaURL} />
    ) : (
      <Document documentUrl={mediaURL} title={title} />
    );
  };

  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleUpload = (data) => {
    // Do something with the uploaded data
    console.log("Uploaded Data:", data);
    // Add the uploaded data to the list of uploaded modules
    setUploadedModules((prevModules) => [...prevModules, data]);
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
              <input
                type="text"
                value={objectives}
                onChange={handleObjectiveChange}
                readOnly={edit}
              />
            </div>
          )}
          {activeTab === 1 && (
            <div className="flex flex-col mt-[100px]">
              <div className="flex justify-end">
                <button onClick={toggleEditModal}>Add Modules</button>
              </div>
              <div className="outlineCard-container mt-4">
                <ul className="fcourse-container-grid">
                  {uploadedModules?.map((module, index) => (
                    <li key={index} className="border-none">
                      <OutlineCard
                        index={index + 1}
                        moduleTitle={module?.moduleTitle}
                        uploadedModules={uploadedModules}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {editModalVisible && (
        <EditModal
          setEditModalVisible={setEditModalVisible}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};
export default CourseObjective;
