import { faBars, faClose, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../index";
import { queries } from "../../api";
import { OverlayLoader } from "../../loaders";
import { clearStorage, getStorage } from "../../utils";
import Completed from "../../component/Featured Courses/Completed";
import logo from "../../utils/logo.png";
import "./Profile.css";

const profileTab = [
  { id: 0, label: "Profile" },
  { id: 1, label: "Completed Courses" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserfirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [userUniversity, setUseruniversity] = useState("");
  const [userPassword, setUserpassword] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const { getUser, getUniversity } = queries;

  const userId = getStorage("userId");

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery(["profile-user"], () => getUser(userId), {
    enabled: !!userId,
    onSuccess: (userData) => {
      const user = userData?.data?.resource;
      if (user) {
        // Trigger the second query using the user's university ID
        queryClient.prefetchQuery(["profile-university", user.university], () =>
          getUniversity(user.university)
        );
      }
    },
  });

  const user = userData?.data?.resource;

  const {
    data: universityData,
    isLoading: universityLoading,
    isError: universityError,
  } = useQuery(
    ["profile-university", user?.university],
    () => getUniversity(user?.university),
    {
      enabled: !!user?.university,
    }
  );

  const university = universityData?.data?.resource;

  useEffect(() => {
    if (user) {
      setUserLastName(user?.fullName?.split(" ")[1]);
      setUserfirstName(user?.fullName?.split(" ")[0]);
      setUseremail(user?.email);
      setUseruniversity(user?.university);
    }
  }, [user]);

  if (userLoading || universityLoading) {
    return <OverlayLoader showing={true} />;
  }

  if (userError || universityError) {
    <OverlayLoader showing={false} />;
  }

  if (user || university) {
    <OverlayLoader showing={false} />;
  }

  const inputchangehandler = (event) => {
    setUserfirstName(event.target.value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    clearStorage();
    navigate("/");
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
              <span className="userprofile">
                {userFirstName?.charAt(0)} {userLastName?.charAt(0)}
              </span>
              <p> {user?.fullName}</p>
            </div>

            <div className="objective" onClick={() => setOpen(false)}>
              <div className="objective-container">
                <div className="Sidenav-tab">
                  <div className="Menutabs">
                    {profileTab.map((menu, index) => (
                      <ul
                        className={activeTab === menu.id ? "active" : ""}
                        onClick={() => setActiveTab(menu.id)}
                      >
                        <li key={menu.id + index}>{menu.label}</li>
                      </ul>
                    ))}
                  </div>
                  <div className="logoutbtn absolute bottom-0 left-24">
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                </div>
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
                <label>Email</label>
                <br />
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
                  // value={userUniversity}
                  defaultValue={university?.name}
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
                  <Link to="/change-pass" style={{ textDecoration: "none" }}>
                    <span>Change password</span>
                  </Link>
                </div>
              </div>
            </form>
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

export default Profile;
