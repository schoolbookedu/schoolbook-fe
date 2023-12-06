import { axiosInstance } from "../config";
import { HTTP_METHODS } from "../utils";
import { endpoints } from ".";

export const queries = {
  async getTutorCourses() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.courses.tutorCourses,
    });
    return response.data;
  },
  async getCourse(courseId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.courses.get + "/" + courseId,
    });
    return response?.data;
  },

  async getCourses() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.courses.get,
    });
    return response?.data;
  },

  async getStudentCourses() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.courses.studentCourses,
    });
    return response?.data;
  },
  async getUser(userId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.users.get + "/" + userId,
    });
    return response.data;
  },
  async getMaterial(userId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.materials.get + "/" + userId,
    });
    return response.data;
  },

  async getUniversity(universityId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.universities.get + "/" + universityId,
    });
    return response?.data;
  },

  async getUniversities() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.universities.get,
    });
    return response?.data;
  },

  async getDepartments() {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.departments.get,
    });
    return response.data;
  },

  async getDepartment(departmentId) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.GET,
      url: endpoints.departments.get + "/" + departmentId,
    });
    return response.data;
  },
};
