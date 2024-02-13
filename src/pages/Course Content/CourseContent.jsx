import { React, useState } from "react";
import CourseOutline1 from "../../component/Course Component/CourseOutline1";
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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuLinkClick = (menuId) => {
    console.log({ menuId, activeSubmenu });
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

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
                        onClick={() => setActiveTab(module?._id)}
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
                                {module?.materials?.map((material, index) => (
                                  <div className="submenu-items" key={index}>
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
        <div className="tab-content">
          {courseResult?.modules.map((module, index) => (
            <div key={module?._id + index}>
              <CourseOutline1
                materials={module?.materials}
                title={module.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
