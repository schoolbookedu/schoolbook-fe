import { axiosInstance } from "../config";
import { HTTP_METHODS } from "../utils";
import { endpoints } from "./endpoints";

export const queries = {
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
