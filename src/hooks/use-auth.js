import { getStorage } from "../utils";

export const useAuth = () => {
  const token = getStorage("accessToken");
  const userType = getStorage("userType");

  return !!token && !!userType;
};
