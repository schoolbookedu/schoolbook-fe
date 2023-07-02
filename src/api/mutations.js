import { axiosInstance } from "../config";
import { HTTP_METHODS, USER_TYPE, setStorage } from "../utils";
import { endpoints } from ".";

export const mutations = {
  //user
  async verifyUser(userId) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.VERIFY_USER + "/" + userId,
    });
  },

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
  },

  async login(data) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.LOGIN,
      data,
    });

    if (response?.data) {
      const payload = response?.data?.data;
      const accessToken = payload?.extra?.accessToken;
      const user = payload?.resource;
      const userType = user?.userType;

      setStorage("accessToken", accessToken);
      setStorage("userType", userType);
      setStorage("userId", user?._id);

      switch (userType) {
        case USER_TYPE.INSTRUCTOR:
          window.location.href = "/instructor-dashboard";
          break;
          case USER_TYPE.STUDENT:
          window.location.href = "/dashboard";
          break;
          default:
          window.alert("Invalid User Type"); 
          break;
      }
    }
  },

 

  // course
  async createCourse(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.CREATE_COURSE,
      data,
    });
  },

  async deleteCourse(courseId) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.DELETE_COURSE + "/" + courseId,
    });
  },

  async updateCourse(courseId, data) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.UPDATE_COURSE + "/" + courseId,
      data,
    });
  },

  // university
  async createUniversity(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.CREATE_UNIVERSITY,
      data,
    });
  },

  async deleteUniversity(universityId) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.DELETE_UNIVERSITY + "/" + universityId,
    });
  },

  async updateUniversity(universityId, data) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.UPDATE_UNIVERSITY + "/" + universityId,
      data,
    });
  },

  // departments
  async createDepartment(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.CREATE_DEPARTMENT,
      data,
    });
  },

  async deleteDepartment(departmentId) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.DELETE_DEPARTMENT + "/" + departmentId,
    });
  },

  async updateDepartment(departmentId, data) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.UPDATE_DEPARTMENT + "/" + departmentId,
      data,
    });
  },
};
