import axiosInstance from "../../../services/axiosInstance";

export const getstudents = (page, limit) =>
  axiosInstance.get(`/students?page=${page}&limit=${limit}`);

