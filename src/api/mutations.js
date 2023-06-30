import { axiosInstance } from "../config";
import { HTTP_METHODS, USER_TYPE } from "../utils";
import { endpoints } from ".";

export const mutations = {
  async forgotPassword(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.FORGOT_PASSWORD,
      data,
    });
  },
  async register(data) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.REGISTER,
      data,
    });

    if (response?.data) {
      return (window.location.href = "/verify");
    }
    // return response.data;
  },

  async login(data) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.LOGIN,
      data,
    });

    const accessToken = response?.data?.data?.extra?.accessToken;
    const user = response?.data?.data?.resource;
    const userType = user?.userType;

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("userType", userType);
    sessionStorage.setItem("userId", user?._id);

    switch (userType) {
      case USER_TYPE.INSTRUCTOR:
        window.location.href = "/instructor-dashboard";
        break;
      default:
        window.location.href = "/dashboard";
        break;
    }
  },
};
