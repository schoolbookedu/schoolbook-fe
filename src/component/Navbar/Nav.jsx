import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useOverlayLoader } from "../../hooks";
import { OverlayLoader } from "../../loaders";
import { queries } from "../../api";

import logo from "../../utils/logo.png";
import "./Nav.css";

const Nav = () => {
  const { getUser } = queries;
  const { show, showing, hide } = useOverlayLoader();

  const userId = sessionStorage.getItem("userId");

  const { data, isLoading, isError } = useQuery(
    ["user"],
    () => getUser(userId),
    {
      enabled: Boolean(userId),
    }
  );

  if (isLoading) {
    <OverlayLoader showing={true} />;
    return null;
  }

  if (isError) {
    <OverlayLoader showing={false} />;
    return <>An error occurred</>;
  }

  const user = data?.data?.resource;

  if (user) {
    <OverlayLoader showing={false} />;
  }

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {user && (
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="user">
              <span className="userprofile">
                {user.fullName?.split(" ")[0]?.charAt(0) ?? ""}{" "}
                {user.fullName?.split(" ")[1]?.charAt(0) ?? ""}
              </span>
              <p>{user.fullName}</p>
            </div>
          </Link>
        )}
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default Nav;
