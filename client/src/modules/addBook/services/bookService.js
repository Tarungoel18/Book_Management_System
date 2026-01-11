import axiosInstance from "../../../services/axiosInstance";

export const addBookApi = (data) =>
  axiosInstance.post("/books", data);
