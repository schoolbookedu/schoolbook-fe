import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("accessToken");
  const userType = sessionStorage.getItem("userType");

  useLayoutEffect(() => {
    if (!token || !userType) {
      return (window.location.href = "/");
    }
  }, []);

  return <Outlet />;
};

export default PrivateRoutes;
