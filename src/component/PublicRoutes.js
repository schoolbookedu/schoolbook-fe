import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { USER_TYPE, getStorage } from "../utils";

export const PublicRoutes = () => {
  const isAuth = useAuth();
  const userType = getStorage("userType");

  return isAuth ? (
    userType === USER_TYPE.STUDENT ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/instructor-dashboard" replace />
    )
  ) : (
    <Outlet />
  );
};
