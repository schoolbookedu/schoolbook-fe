import { axiosInstance } from "../config";
import { HTTP_METHODS, USER_TYPE, setStorage } from "../utils";
import { endpoints } from ".";

export const mutations = {
  // auth
  async ResetPassword(payload) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.auth.resetPassword,
      data: payload,
    });
  },

  async changePassword(payload) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.auth.changePassword,
      data: payload,
    });
  },

  async forgotPassword(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.auth.forgotPassword,
      data,
    });
  },

  async register(data) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.auth.register,
      data,
    });

    if (response?.data) {
      return (window.location.href = "/verify");
    }
  },

  async login(data) {
    const response = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.auth.login,
      data,
    });

    if (response?.data) {
      const payload = response?.data?.data;
      const accessToken = payload?.extra?.accessToken;
      const user = payload?.resource;
      const userType = user?.userType;
      // alert(userType)
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

  //user

  async verifyUser(userId) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.users.verifyUser + "/" + userId,
    });
  },

  // course
  async createCourse(payload) {
    const { data } = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.courses.create,
      data: payload,
    });
    return data?.data?.resource;
  },

  async deleteCourse(courseId) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.courses.delete + "/" + courseId,
    });
  },

  async updateCourse(courseId, data) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.courses.update + "/" + courseId,
      data,
    });
  },

  async enrollCourse(courseId) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.courses.enroll,
      data: { courseId },
    });
  },

  // modules
  async createModule(payload) {
    const { data } = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.modules.create,
      data: payload,
    });
    return data?.data?.resource;
  },

  async editModule(payload) {
    const { moduleId, ...restPayload } = payload  ;
    const { data } = await axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.modules.edit + "/"+ moduleId,
      data: restPayload,
    });
    return data?.data?.resource;
  },

  async deleteModule(id) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.modules.delete + "/" + id,
    });
  },

  // materials
  async createMaterial(payload) {
    const { data } = await axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.materials.create,
      headers: { "Content-Type": "multipart/form-data" },
      data: payload,
    });
    return data?.data?.resource;
  },

  // university
  async createUniversity(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.universities.create,
      data,
    });
  },

  async deleteUniversity(universityId) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.universities.delete + "/" + universityId,
    });
  },

  async updateUniversity(universityId, data) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.universities.update + "/" + universityId,
      data,
    });
  },

  // departments
  async createDepartment(data) {
    return axiosInstance.request({
      method: HTTP_METHODS.POST,
      url: endpoints.departments.create,
      data,
    });
  },

  async deleteDepartment(departmentId) {
    return axiosInstance.request({
      method: HTTP_METHODS.DELETE,
      url: endpoints.departments.delete + "/" + departmentId,
    });
  },

  async updateDepartment(departmentId, data) {
    return axiosInstance.request({
      method: HTTP_METHODS.PATCH,
      url: endpoints.departments.update + "/" + departmentId,
      data,
    });
  },
};
