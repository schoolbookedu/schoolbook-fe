import React, { useState } from "react";
import Audio from "./Audio";
import Video from "./Video";
import Document from "./Document";
import { mediaType } from "../../utils";
import { useSelector } from "react-redux";
import { selectUI } from "../../store/inputSlice";
import OutlineCard from "../Outline Card/OutlineCard";
import EditModal from "../Modals/EditModal";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Modules" },
];

const CourseObjective = ({ edit, handleObjectiveChange, courseId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { objectives } = useSelector(selectUI);

  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
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

              <CourseModules courseId={courseId} />
            </div>
          )}
        </div>
      </div>
      {editModalVisible && (
        <EditModal
          setEditModalVisible={setEditModalVisible}
          courseId={courseId}
        />
      )}
    </>
  );
};
export default CourseObjective;

const CourseModules = ({ courseId }) => {
  const { getCourseModules } = queries;

  const getCourseModulesQuery = useQuery({
    queryKey: ["courses-modules"],
    queryFn: () => getCourseModules(courseId),
  });

  if (getCourseModulesQuery?.isLoading) {
    return <div>Loading modules...</div>;
  }

  if (getCourseModulesQuery?.isError) {
    return <>An error occurred while loading modules</>;
  }

  const modules = getCourseModulesQuery?.data?.data?.resource?.modules;

  return (
    <div className="outlineCard-container mt-4">
      <ul className="fcourse-container-grid">
        {" "}
        {!!modules?.length &&
          modules?.map((module, index) => (
            <li key={index} className="border-none">
              <OutlineCard
                index={index + 1}
                moduleTitle={module?.title}
                moduleId={module?._id}
                courseId={courseId}
                materials={module?.materials ?? []}
              />
            </li>
          ))}{" "}
      </ul>
    </div>
  );
};
