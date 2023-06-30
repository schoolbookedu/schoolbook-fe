import { axiosInstance } from "../config";
import { HTTP_METHODS } from "../utils";
import { endpoints } from "./endpoints";

export const mutations = {
  async register(data) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.REGISTER,
      data,
    });
    return response.data;
  },

  async instructorLogin() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.LOGIN,
    });
    return response.data;
  },

  async studentLogin() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.LOGIN,
    });
    return response.data;
  },
};
