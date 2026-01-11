import axiosInstance from "../../../services/axiosInstance";

export const getBooksApi = (page, limit) =>
  axiosInstance.get(`/books?page=${page}&limit=${limit}`);
