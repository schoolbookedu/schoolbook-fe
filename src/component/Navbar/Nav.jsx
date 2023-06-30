import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import logo from "../../utils/logo.png";
import "./Nav.css";
import { queries } from "../../api";

const Nav = () => {
  const { getUser } = queries;

  const userId = sessionStorage.getItem("userId");

  const { data, isLoading, isError } = useQuery(
    ["user"],
    () => getUser(userId),
    {
      enabled: !!userId,
    }
  );

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <>An error occured</>;
  }

  const user = data?.data?.resource;

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {user && (
          <Link to="/Profile" style={{ textDecoration: "none" }}>
            <div className="user">
              <span className="userprofile">
                {user?.fullName?.split(" ")[0]?.charAt(0)}{" "}
                {user?.fullName?.split(" ")[1]?.charAt(0)}
              </span>
              <p> {user?.fullName}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
