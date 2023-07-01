export const useAuth = () => {
  const token = sessionStorage.getItem("accessToken");
  const userType = sessionStorage.getItem("userType");

  return !!token && !!userType;
};
