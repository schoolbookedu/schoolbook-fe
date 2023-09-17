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
    <div className="nav w-full flex justify-center items-center bg-[#407BFF] z-[999]">
      <div className="nav-container w-[80%] flex flex-row justify-between p-[10px]">
        <div className="nav-logo w-[50px] md:w-[80px] h-[50px] md:h-[80px] bg-[#fFFFFF]">
          <Link to="/">
            <img src={logo} alt="logo" 
            className="w-full h-full object-cover"/>
          </Link>
        </div>
        {user && (
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="user flex justify-center align-center">
              <span className="userprofile p-[12px] md:p-[20px] text-[#000000] text-[16px] md:text-[24px] font-bold bg-[#FFFFFF] ">
                {user.fullName?.split(" ")[0]?.charAt(0) ?? ""}{" "}
                {user.fullName?.split(" ")[1]?.charAt(0) ?? ""}
              </span>
              <p className="hidden md:block text-[#FFFFFF] text-[24px] align-center ml-[20px]">{user.fullName}</p>
            </div>
          </Link>
        )}
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default Nav;
