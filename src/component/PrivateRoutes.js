import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../hooks";

const PrivateRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={"/"} replace={true} />;
};

export default PrivateRoutes;
