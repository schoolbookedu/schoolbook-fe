import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import Completed from "../../component/Featured Courses/Completed";
import logo from "../../utils/logo.png";
import "../User Profile/Profile.css";

const profileTab = [
  { id: 0, label: "Profile" },
  { id: 1, label: "Completed Courses" },
];

const ChangePass = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard-menu">
        <div
          className={`menu-icon ${open ? "open" : ""}`}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="profile-container">
        {open && (
          <div className="profile-id">
            <div className="cancel-icon" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faClose} />
            </div>
            <div className="user">
              <span className="userprofile">AO</span>
              <p>Oluwaseyi</p>
            </div>

            <div className="objective" onClick={() => setOpen(false)}>
              <div className="objective-container">
                <div className="Sidenav-tab">
                  <div className="Menutabs">
                    {profileTab.map((menu) => (
                      <ul
                        className={activeTab === menu.id ? "active" : ""}
                        onClick={() => setActiveTab(menu.id)}
                      >
                        <li key={menu.id}>{menu.label}</li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              <div className="logoutbtn">
                <Link to="/">
                  <button>Log Out</button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="profile-edit">
          {activeTab === 0 && (
            <div className="changepass">
              <h2>Change Password</h2>
              <form>
                <input type="password" placeholder="Old Password"></input>
                <input type="password" placeholder="New Password"></input>
                <div className="formButton">
                  <Link to="/">
                    <input type="submit" value="Change Password"></input>
                  </Link>
                </div>
              </form>
            </div>
          )}
          {activeTab === 1 && (
            <div className="completed-courses">
              <Completed />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePass;
