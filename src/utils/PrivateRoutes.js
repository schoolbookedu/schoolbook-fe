import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let auth = { token: false };

  useLayoutEffect(() => {
    if (!auth.token) {
      return navigate("/");
    }
  }, [auth.token, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;
