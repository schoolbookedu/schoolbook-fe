import { axiosInstance } from "../config";
import { HTTP_METHODS } from "../utils";
import { endpoints } from ".";

export const queries = {
  async getUser(userId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_USER + "/" + userId,
    });
    return response.data;
  },
  async getUniversities() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.UNIVERSITIES,
    });
    return response.data;
  },
  async getDepartments() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.DEPARTMENTS,
    });
    return response.data;
  },
};
