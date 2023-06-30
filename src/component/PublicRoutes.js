import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

import { USER_TYPE } from "../utils";

export const PublicRoutes = () => {
  const token = sessionStorage.getItem("accessToken");
  const userType = sessionStorage.getItem("userType");

  useLayoutEffect(() => {
    if (token && userType) {
      switch (userType) {
        case USER_TYPE.INSTRUCTOR:
          window.location.href = "/instructor-dashboard";
          break;
        default:
          window.location.href = "/dashboard";
          break;
      }
    }
  }, []);

  return <Outlet />;
};
