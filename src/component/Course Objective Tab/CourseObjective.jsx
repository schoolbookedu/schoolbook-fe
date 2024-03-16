import React, { useState } from "react";
import { USER_TYPE, mediaType } from "../../utils";
import OutlineCard from "../Outline Card/OutlineCard";
import EditModal from "../Modals/EditModal";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";

const tabs = [
  { id: 0, label: "Course Objectives" },
  { id: 1, label: "Course Modules" },
];

const CourseObjective = ({
  edit,
  handleObjectiveChange,
  courseId,
  objectives,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);

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
              {USER_TYPE !== "instructor" ? (
                <div className="flex justify-end">
                  <button onClick={toggleEditModal}>Add Modules</button>
                </div>
               ) : null}
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
