import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Completed from "../../component/Featured Courses/Completed";
import logo from "../../utils/logo.png";
import "../User Profile/Profile.css";
import { useFormValidation } from "../../validators";
import { ErrorMessage } from "../../component/error-message";

const profileTab = [
  { id: 0, label: "Profile" },
  { id: 1, label: "Completed Courses" },
];

const changePasswordFieldToValidate = ["oldPassword", "newPassword"];

const ChangePass = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);

  const validateSchema = useFormValidation(changePasswordFieldToValidate);

  const handleClick = () => {
    setOpen(!open);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    // mutation.mutate(data);
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  {...register("oldPassword")}
                />

                {errors.oldPassword && (
                  <ErrorMessage message={errors.oldPassword.message} />
                )}

                <input
                  type="password"
                  placeholder="New Password"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  {...register("newPassword")}
                />

                {errors.newPassword && (
                  <ErrorMessage message={errors.newPassword.message} />
                )}

                <div className="formButton">
                  <input type="submit" value="Change Password"></input>
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
