import { axiosInstance } from "../config";
import { HTTP_METHODS } from "../utils";
import { endpoints } from ".";

export const queries = {
  async getCourse(courseId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_COURSE + "/" + courseId,
    });
    return response.data;
  },

  async getCourses() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_COURSES,
    });
    return response.data;
  },

  async getUser(userId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_USER + "/" + userId,
    });
    return response.data;
  },

  async getUniversity(universityId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_UNIVERSITY + "/" + universityId,
    });
    return response.data;
  },

  async getUniversities() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_UNIVERSITIES,
    });
    return response.data;
  },

  async getDepartments() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_DEPARTMENTS,
    });
    return response.data;
  },

  async getDepartment(departmentId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.GET_DEPARTMENT + "/" + departmentId,
    });
    return response.data;
  },
};
