import axiosInstance from "../../../services/axiosInstance";

export const loginApi = (data) =>
  axiosInstance.post("/auth/login", data);
