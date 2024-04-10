import { React, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FaTimes } from "react-icons/fa";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMaterialStore } from "../../store/materialStore";
import { CourseMaterial } from "../../pages/Course Content/CourseContent";

const Coursesidebar = () => {
  const { courseId } = useParams();
  const { getCourse, getCourseModulesMaterials } = queries;
  const setMaterial = useMaterialStore((state) => state.setMaterial);

  const courseQuery = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(courseId),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [module, setModule] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleMenuLinkClick = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  const courseResult = courseQuery?.data?.data?.resource;

  return (
    <div>
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
                  <div className="close-icon" onClick={handleClick}>
                    <FaTimes />
                  </div>
                </div>
                <div className="Sidenav-tab">
                  <div className="Menutabs">
                    {courseResult?.modules?.map((module, index) => (
                      <CourseMaterial
                        key={module?._id + index}
                        index={index}
                        setActiveTab={setActiveTab}
                        module={module}
                        activeTab={activeTab}
                        handleMenuLinkClick={handleMenuLinkClick}
                        setModule={setModule}
                        activeSubmenu={activeSubmenu}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coursesidebar;