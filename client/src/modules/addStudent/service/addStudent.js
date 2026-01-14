  import axiosInstance from "../../../services/axiosInstance";

  export const addStudent = (data) =>
  axiosInstance.post(`/students`,data);