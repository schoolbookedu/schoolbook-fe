import { React, useEffect, useState } from "react";
import Nav from "../../component/Navbar/Nav";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CourseContent.css";
import { FaFileAudio, FaFileVideo, FaFileAlt, FaTimes } from "react-icons/fa";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { OverlayLoader } from "../../loaders";
import { useParams } from "react-router-dom";
import { mediaType } from "../../utils";
import CourseModuelMaterial from "../../component/Courses/CourseModuleMaterial";

const CourseContent = () => {
  const { courseId } = useParams();
  const { getCourse } = queries;
  const courseQuery = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(courseId),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [module, setModule] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuLinkClick = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  // useEffect(() => {
  //   if (courseQuery?.data?.data?.resource?.modules?.length > 0) {
  //     setModule(courseQuery?.data?.data?.resource?.modules[0]);
  //   }
  // }, [courseQuery?.data?.data?.resource?.modules]);

  if (courseQuery?.isLoading) {
    return <OverlayLoader showing={true} />;
  }

  if (courseQuery?.isError) {
    <OverlayLoader showing={false} />;
    return <>An error occurred</>;
  }

  const courseResult = courseQuery?.data?.data?.resource;

  return (
    <div>
      <Nav />
      <div className="sidenav">
        <div className="sidenav-container">
          <div
            className={`menu-icon ${isOpen ? "open" : ""}`}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          {isOpen && (
            <div className="side-nav-bar">
              <div className="sidenav-body">
                <div className="sidenav-title">
                  <h2>{courseResult?.title}</h2>
                  <div className="close-icon" onClick={() => setIsOpen(false)}>
                    <FaTimes />
                  </div>
                </div>
                <div className="Sidenav-tab">
                  <div className="Menutabs">
                    {courseResult?.modules?.map((module, index) => (
                      <ul
                        key={module?._id + index}
                        className={activeTab === module?._id ? "active" : ""}
                        onClick={() => {
                          setActiveTab(module?._id);
                          setModule(module);
                        }}
                      >
                        <li>
                          <div
                            className="menulink"
                            onClick={() => handleMenuLinkClick(module?._id)}
                          >
                            Course module {index + 1} - {module?.title}{" "}
                          </div>
                          {!!module?.materials?.length &&
                            activeSubmenu === module?._id && (
                              <div className="submenu">
                                {module?.materials?.map((_, index) => (
                                  <ModuleMaterials
                                    moduleId={module?._id}
                                    key={index}
                                  />
                                ))}
                              </div>
                            )}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sidenav-content">
        <MainCourseContent module={module} />
        {/* <div className="tab-content">
          {courseResult?.modules.map((module, index) => (
            <div key={module?._id + index}>
              <CourseOutline1 moduleId={module?._id} title={module?.title} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CourseContent;

export const MainCourseContent = ({ module }) => {
  const { getCourseModulesMaterials } = queries;
  const moduleMaterialQuery = useQuery({
    queryKey: ["moduleMaterial"],
    queryFn: () => getCourseModulesMaterials(module?._id),
    enabled: !!module?._id && module?.materials?.length < 0,
  });

  if (moduleMaterialQuery?.isLoading && module?._id) {
    return <div>Loading...</div>;
  }

  if (moduleMaterialQuery?.isError && module?._id) {
    return <>An error occurred while fetching material</>;
  }

  const materials = moduleMaterialQuery?.data?.data?.resource?.materials;

  return (
    <div className="tab-content">
      {module?.materials?.length > 0 ? (
        <>
          <CourseModuelMaterial materials={materials} title={module?.title} />
        </>
      ) : (
        <div className="my-[2rem] text-xl">No materials found</div>
      )}
    </div>
  );
};

const ModuleMaterials = ({ moduleId }) => {
  const { getCourseModulesMaterials } = queries;
  const moduleMaterialQuery = useQuery({
    queryKey: ["moduleMaterial"],
    queryFn: () => getCourseModulesMaterials(moduleId),
  });

  if (moduleMaterialQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  if (moduleMaterialQuery?.isError) {
    return <>An error occurred while fetching material</>;
  }

  const materials = moduleMaterialQuery?.data?.data?.resource?.materials;

  return (
    <div>
      <div className="submenu-items">
        {materials.length > 0 &&
          materials.map((material, index) => (
            <ModuleMaterial key={index} material={material} />
          ))}
      </div>
    </div>
  );
};

const ModuleMaterial = ({ material }) => {
  return (
    <div>
      <div className="submenu-icon">
        {material.type === mediaType.VIDEO ? (
          <FaFileVideo />
        ) : material.type === mediaType.AUDIO ? (
          <FaFileAudio />
        ) : (
          <FaFileAlt />
        )}
      </div>
      <div className="submenu-text">
        <h4>{material.title}</h4>
        <span>{material.type}</span>
      </div>
    </div>
  );
};
