import axiosInstance from "../../../services/axiosInstance";

export const getStudentsApi = () =>
  axiosInstance.get(`/students`);
