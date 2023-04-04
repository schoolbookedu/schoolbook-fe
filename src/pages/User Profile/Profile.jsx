import { faBars, faClose, faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import Completed from "../../component/Featured Courses/Completed";
import logo from "../../utils/logo.png";
import "./Profile.css";

const profileTab = [
  { id: 0, label: "Profile" },
  { id: 1, label: "Completed Courses" },
];

const Profile = () => {
  const [userFirstName, setUserfirstName] = useState("Oluwaseyi");
  const [userLastName, setUserLastName] = useState("Ajewole");
  const [userEmail, setUseremail] = useState("Olubayoseyi10@gmail.com");
  const [userUniversity, setUseruniversity] = useState(
    "Bowen University, iwo, Osun state"
  );
  const [userPassword, setUserpassword] = useState("Oluwaseyi1234###");
  const [activeTab, setActiveTab] = useState(0);
  const [open,  setOpen] = useState(false)

  const inputchangehandler = (event) => {
    setUserfirstName(event.target.value);
  };

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
      <div className={`menu-icon ${open ? 'open' : ''}`} onClick={handleClick}>
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
            <form>
              <div className="fullname">
                <div className="name">
                  <label>FirstName</label>
                  <br />
                  <input
                    type="text"
                    placeholder="FirstName"
                    onChange={inputchangehandler}
                    value={userFirstName}
                  />
                  <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className="name">
                  <label>LastName</label>
                  <input
                    type="text"
                    placeholder="LastName"
                    onChange={inputchangehandler}
                    value={userLastName}
                  />
                  <FontAwesomeIcon icon={faPencil} />
                </div>
              </div>
              <div className="inst">
                <label>Email</label><br/>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={inputchangehandler}
                  value={userEmail}
                />
                <FontAwesomeIcon icon={faPencil} />
              </div>
              <div className="inst">
                <label>Institution</label>
                <input
                  type="text"
                  placeholder="Institution"
                  onChange={inputchangehandler}
                  value={userUniversity}
                />
                <FontAwesomeIcon icon={faPencil} />
              </div>
              <div className="password">
                <label>Password</label>
                <div className="pass">
                  <input
                    type="password"
                    onChange={inputchangehandler}
                    value={userPassword}
                  />
                  <Link
                    to="/ChangePass"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Change password</span>
                  </Link>
                </div>
              </div>
            </form>
          )}
          {activeTab === 1 && 
          <div className="completed-courses">
            <Completed/>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default Profile;
