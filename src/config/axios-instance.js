import axios from "axios";
import { showToast } from "../component/notifications";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let authState = window.sessionStorage.getItem("token");

    config.headers.Authorization = `Bearer ${authState}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.clear();
      showToast("Session timed out", "warning");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.message === "" || response.data.message === undefined) {
        console.log("");
      } else {
        showToast(response.data.message, "success");
      }
    }
    return response;
  },
  (error) => {
    if (!error?.response?.data) {
      return;
    }
    if (error.response.status >= 300) {
      return showToast(
        !!error.response.data.error
          ? error.response.data.error
          : "check your internet connection"
      );
    }
    return Promise.reject(error);
  }
);
