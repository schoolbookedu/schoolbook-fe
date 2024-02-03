import { React, useState } from "react";
import CourseOutline1 from "../../component/Course Component/CourseOutline1";
import CourseOutline2 from "../../component/Course Component/CourseOutline2";
import CourseOutline3 from "../../component/Course Component/CourseOutline3";
import CourseOutline4 from "../../component/Course Component/CourseOutline4";
import CourseOutline5 from "../../component/Course Component/CourseOutline5";
import CourseOutline6 from "../../component/Course Component/CourseOutline6";
import Nav from "../../component/Navbar/Nav";
import { faBars, faClose, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CourseContent.css";
import { useSelector } from "react-redux";
import { FaFileAudio, FaFileVideo, FaFileAlt, FaTimes } from 'react-icons/fa';

const sideMenu = [
  {
    id: 0,
    link: "Course Module 1",
    icon: <FaFileVideo />,
    fileType: "Video",
    title: "Introduction to Software Engineering",
    submenus: ["What is Software Engineering", "What is Software Engineering", "What is Software Engineering"],
  },
  {
    id: 1,
    link: "Course Module 2",
    icon: <FaFileAudio />,
    fileType: "Audio",
    title: "Introduction to Software Engineering",
    submenus: ["What is Software Engineering", "What is Software Engineering", "What is Software Engineering"],
  },
  {
    id: 2,
    link: "Course Module 3",
    icon: <FaFileAlt/>,
    fileType: "Document",
    title: "Introduction to Software Engineering",
    submenus: ["What is Software Engineering", "What is Software Engineering", "What is Software Engineering"],
  },
  {
    id: 3,
    link: "Course Module 4",
    icon: <FaFileVideo />,
    fileType: "Video",
    title: "Introduction to Software Engineering",
    submenus: ["What is Software Engineering", "What is Software Engineering", "What is Software Engineering"],
  },
  { id: 4, link: "Course Outline 5" },
  { id: 5, link: "Course Outline 6" },
];


const CourseContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuLinkClick = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

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
                  <h2>Title</h2>
                  <div className="close-icon" onClick={() => setIsOpen(false)}>
                    <FaTimes />
                  </div>
                </div>
                <div className="Sidenav-tab" >
                  <div className="Menutabs">
                    {sideMenu.map((menu) => (
                      <ul
                        key={menu.id}
                        className={activeTab === menu.id ? "active" : ""}
                        onClick={() => setActiveTab(menu.id)}
                      >
                        <li>
                          <div
                            className="menulink"
                            onClick={() => handleMenuLinkClick(menu.id)}
                          >
                            {menu.link} - {menu.title}{" "}
                          </div>
                          {menu.submenus && activeSubmenu === menu.id && (
                            <div className="submenu">
                              {menu.submenus.map((submenu, index) => (
                                <div className="submenu-items" key={index}>
                                  <div className="submenu-icon">{menu.icon}</div>
                                  <div className="submenu-text">
                                    <h4>{submenu}</h4>
                                    <span>{menu.fileType}</span>
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
          {activeTab === 0 && <CourseOutline1 />}
          {activeTab === 1 && <CourseOutline2 />}
          {activeTab === 2 && <CourseOutline3 />}
          {activeTab === 3 && <CourseOutline4 />}
          {activeTab === 4 && <CourseOutline5 />}
          {activeTab === 5 && <CourseOutline6 />}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;